import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Button,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import DefaultUserImage from "../../assets/images/default-user.png";
import { API, graphqlOperation, Auth, DataStore } from "aws-amplify";
import { User } from "../models";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "@aws-amplify/storage";
import { S3Image } from "aws-amplify-react-native";

const createUser = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      createdAt
      updatedAt
      name
      image
      _version
      _lastChangedAt
      _deleted
    }
  }
`;

const EditProfileScreen = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState("");
  const [graduation, setGraduation] = useState("");
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      const dbUser = await DataStore.query(User, userData.attributes.sub);
      setUser(dbUser);
      setName(dbUser?.name);
      setGraduation(dbUser?.graduation);
      setLocation(dbUser?.location);
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    if (user) {
      await updateUser();
    } else {
      await createNewUser();
    }
    navigation.navigate("Feed");
  };

  const createNewUser = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    const newUser = {
      id: userData.attributes.sub,
      name,
      location,
      graduation,
      _version: 1,
    };

    if (image) {
      newUser.image = await uploadFile(image);
    }

    await API.graphql(graphqlOperation(createUser, { input: newUser }));
  };

  const updateUser = async () => {
    let imageKey = "";
    if (image) {
      imageKey = await uploadFile(image);
    }

    await DataStore.save(
      User.copyOf(user, (updated) => {
        updated.name = name;
        updated.location = location;
        updated.graduation = graduation;
        if (imageKey) {
          updated.image = imageKey;
        }
      })
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadFile = async (fileUri) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${uuidv4()}.png`;
      await Storage.put(key, blob, {
        contentType: "image/png",
      });
      return key;
    } catch (err) {
      console.log("Error uploading file: ", err);
    }
  };

  let renderImage = <Image source={DefaultUserImage} style={styles.image} />;
  if (image) {
    renderImage = <Image source={{ uri: image }} style={styles.image} />;
  } else if (user?.image) {
    renderImage = <S3Image imgKey={user.image} style={styles.image} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { marginBottom: insets.bottom }]}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <Pressable onPress={pickImage} style={styles.imagePickerContainer}>
        {renderImage}
        <Text>Change Photo</Text>
      </Pressable>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Location"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        placeholder="Graduation"
        style={styles.input}
        value={graduation}
        onChangeText={setGraduation}
      />

      <View style={styles.buttonContainer}>
        <Button onPress={handleSave} title="Save" disabled={!name} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  imagePickerContainer: {
    alignItems: "center",
  },
  image: {
    width: "30%",
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 500,
  },
  input: {
    borderColor: "lightgray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%",
    marginVertical: 10,
    padding: 10,
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: 10,
    alignSelf: "stretch",
  },
});
