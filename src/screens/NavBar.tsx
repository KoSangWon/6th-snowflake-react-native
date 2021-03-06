import * as React from 'react';
import styled from 'styled-components/native';
import { useState } from 'react';
import { withNavigation } from '@react-navigation/compat';
import analytics from '@react-native-firebase/analytics';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootTabParamList } from '~/navigation/RootTabNavigation';
import { d, c, l } from '~/utils/constant';

interface Props {
  children: any;
  navigation: any;
  selectedStack: string;
}

const Screen = styled.View`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  height: ${l.bottomBar}px;
  width: ${d.width}px;
  position: absolute;
  bottom: 0px;
  flex: 1;
  flex-direction: row;
  background-color: white;
  border-top-color: ${c.extraLightGray};
  border-top-width: ${d.px * 0.6}px;
`;

const Tab = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding-top: ${d.px * 10}px;
`;
const Title = styled.Text`
  color: ${c.darkGray};
  font-family: 'Jost-Book';
  font-size: ${d.px * 12}px;
  line-height: ${d.px * 20}px;
`;
const SelectedCircle = styled.View`
  height: ${d.px * 10}px;
  width: ${d.px * 10}px;
  margin-top: ${d.px * 5}px;

  background-color: ${c.purple};
  border-radius: 1000px;
`;

const NavBar = ({ children, navigation, selectedStack }: Props) => {
  // const [selectedTab, setSelectedTab] = useState('HomeStack');
  const tabArray = [
    {
      key: 1,
      stackNameEng: 'HomeStack',
      stackNameKor: '홈',
    },
    {
      key: 2,
      stackNameEng: 'ProductStack',
      stackNameKor: '제품',
    },
    {
      key: 3,
      stackNameEng: 'LabStack',
      stackNameKor: '실험실',
    },
    {
      key: 4,
      stackNameEng: 'ClinicStack',
      stackNameKor: '상담소',
    },
    {
      key: 5,
      stackNameEng: 'JoinStack',
      stackNameKor: '마이',
    },
  ];
  return (
    <Screen>
      {children}
      <Container>
        {tabArray.map((tab, index: number) => {
          return (
            <Tab
              key={index}
              activeOpacity={1}
              onPress={() => {
                navigation.navigate(tab.stackNameEng);
                analytics().logEvent(`press_tab_${tab.stackNameEng}`);
                analytics().setCurrentScreen(`${tab.stackNameEng}`);
              }}
            >
              {selectedStack === tab.stackNameEng ? <SelectedCircle /> : null}
              {selectedStack === tab.stackNameEng ? null : (
                <Title>{tab.stackNameKor}</Title>
              )}
            </Tab>
          );
        })}
      </Container>
    </Screen>
  );
};

export default withNavigation(NavBar);
