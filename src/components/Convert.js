import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateContent } from "../features/reducers/contentSlice";

import { putVideoFile } from "../features/api";
import { BACKGROUND_COLOR, SIGNATURE_COLOR } from "../constants/color";
import { useNavigation } from "@react-navigation/native";

function Convert() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const content = useSelector((state) => state.contentReducer.value);
  const option = useSelector((state) => state.optionReducer.value);

  const sendVideoFile = async () => {
    if (!content.video) return;

    const res = await putVideoFile(content.video, option);

    if (!res.data) return;

    if (res.data.ok) {
      dispatch(
        updateContent({
          content: "gif",
          value: res.data.gif,
        }),
      );
      navigation.navigate("Viewer");
    }
  };

  return (
    <View style={styles.convertContainer}>
      <TouchableOpacity onPress={sendVideoFile}>
        <View
          style={
            content.video ? styles.enableSendButton : styles.disableSendButton
          }
        >
          <Text style={styles.buttonText}>Convert</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  convertContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
    borderBottomWidth: 3,
  },
  disableSendButton: {
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 3,
    width: "80%",
    height: 60,
    backgroundColor: BACKGROUND_COLOR,
  },
  enableSendButton: {
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 3,
    width: "80%",
    height: 60,
    backgroundColor: SIGNATURE_COLOR,
  },
  buttonText: { fontSize: 24, width: 220, textAlign: "center" },
});

export default Convert;
