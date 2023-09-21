import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ImageBackground,
  ImageSourcePropType,
  Image,
  Pressable,
} from "react-native";
import { WithLocalSvg } from "react-native-svg";
import MyPageBackground from "../assets/images/mypageBackground.png";
import MyPageIcon from "../assets/images/mypageIcon.png";
import ArrowIcon from "../assets/icons/arrowIcon.svg";
import NavigationButton from "../components/NavigationButton";
import axios from "axios";
import Reactotron from "reactotron-react-native";

function SettingEmail() {
  const mypageBackground: ImageSourcePropType =
    MyPageBackground as ImageSourcePropType;
  const analysisIcon: ImageSourcePropType = MyPageIcon as ImageSourcePropType;
  const arrowIcon: ImageSourcePropType = ArrowIcon as ImageSourcePropType;

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const [email, onChangeEmail] = useState("");
  const [number, onChangeNumber] = useState("");

  const handleFetchEmail = async (currentEmail: string) => {
    Reactotron.log!(currentEmail);
    const sendBE = {
      email: currentEmail,
    };

    try {
      const response = await axios.post(
        "http://j9d106.p.ssafy.io:8080/api/member/email/send",
        sendBE,
      );
      Reactotron.log!("인증 메일 요청 성공!", response);
    } catch (error) {
      Reactotron.log!("인증 메일 요청 실패!", error);
    }
  };

  const handleFetchNumber = async (currentNumber: string) => {
    Reactotron.log!(currentNumber);
    const sendBE = {
      number: currentNumber,
    };

    try {
      const response = await axios.post(
        "http://j9d106.p.ssafy.io:8080/api/member/email/send",
        sendBE,
      );
      Reactotron.log!("이메일 인증 성공!", response);
    } catch (error) {
      Reactotron.log!("이메일 인증 실패!", error);
    }
  };

  return (
    <View className="flex">
      <ImageBackground
        source={mypageBackground}
        resizeMode="cover"
        className="flex w-screen h-screen"
      >
        <View className="z-10 flex flex-col">
          <View className="flex flex-row justify-between items-center px-4">
            <Pressable onPress={() => navigation.navigate("Login")}>
              <WithLocalSvg width={50} height={50} asset={arrowIcon} />
            </Pressable>
            <View className="m-7 p-[2px] flex flex-row h-fill w-[140px] justify-center items-center bg-white70 border-solid border-[3px] rounded-xl border-darkgray">
              <Text className="py-1 px-2 w-full text-center bg-darkgray rounded-lg text-white text-sm font-PretendardExtraBold">
                본인 인증
              </Text>
            </View>
            <View className="bg-transparent h-10 w-10" />
          </View>
          <View className="flex w-full justify-center items-center">
            <View className="overflow-hidden flex flex-col bg-white70 h-fill w-[380px] rounded-3xl border-solid border-[3px] border-darkgray">
              <View className="p-5 flex flex-row items-end justify-between bg-white70 w-fill border-b-[3px] border-darkgray border-solid">
                <View className="gap-4 flex flex-row items-center">
                  <View className="z-10 flex justify-center items-center h-[50px] w-fill p-[3px] bg-white70 border-solid border-[3px] border-darkgray rounded-full">
                    <View className="bg-darkgray h-fill w-fill rounded-full">
                      <Image source={analysisIcon} className="h-10 w-10" />
                    </View>
                  </View>
                  <View className="flex felx-col">
                    <View className="flex flex-row">
                      <Text className="mr-1 text-sub01 text-xs font-PretendardExtraBold">
                        인증된 이메일정보는
                      </Text>
                      <Text className="text-darkgray text-xs font-PretendardExtraBold">
                        안전하게
                      </Text>
                    </View>
                    <View className="flex flex-row">
                      <Text className="text-darkgray text-xs font-PretendardExtraBold">
                        보관
                      </Text>
                      <Text className="text-sub01 text-xs font-PretendardExtraBold">
                        되며 다른 사용자에게
                      </Text>
                    </View>
                    <Text className="text-sub01 text-xs font-PretendardExtraBold">
                      공개되지 않아요.
                    </Text>
                  </View>
                </View>
                <Text className="text-darkgray50 text-sm font-PretendardExtraBold">
                  1/3
                </Text>
              </View>
              <View className="h-fill w-fill">
                <SafeAreaView className="mx-4 w-fit">
                  <View className="flex flex-row mt-4 mb-3 w-full justify-around items-center">
                    <TextInput
                      onChangeText={onChangeEmail}
                      value={email}
                      placeholder="이메일"
                      placeholderTextColor="darkgray"
                      className="h-[60px] w-[230px] p-4 mr-2 bg-white rounded-xl border-solid border-[3px] border-darkgray text-sm font-PretendardExtraBold"
                    />
                    <NavigationButton
                      handleFunction={() => handleFetchEmail(email)}
                      text="인증받기"
                      height="lg"
                      width="sm"
                      size="md"
                      color="lightsky"
                    />
                  </View>
                  <TextInput
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="인증 번호"
                    placeholderTextColor="darkgray"
                    keyboardType="numeric"
                    className="h-[60px] bt-3 mb-4 p-4 bg-white rounded-xl border-solid border-[3px] border-darkgray text-darkgray50 text-sm font-PretendardExtraBold"
                  />
                </SafeAreaView>
              </View>
            </View>
          </View>
        </View>
        <Pressable className="z-0 w-full h-full absolute pb-10 flex justify-end items-center">
          <NavigationButton
            screenName="SettingName"
            handleFunction={() => handleFetchNumber(number)}
            text="다 음"
            height="lg"
            width="lg"
            size="md"
            color="deepgreen"
          />
        </Pressable>
      </ImageBackground>
    </View>
  );
}

export default SettingEmail;