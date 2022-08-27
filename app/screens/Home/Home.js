import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {CheckIcon} from 'native-base';
// import { SvgIcon } from '../../assets/Icons';
import {storeDataItem, retrieveDataItem} from '~utilities/Storage';
import {fonts} from '~utilities/Constants';
// import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const onButtonClick = async () => {
    await storeDataItem('test', 'data stored');
    const data = await retrieveDataItem('test');
    console.log(data);
  };

  return (
    <View style={{marginTop: 100, alignSelf: 'center'}}>
      {/* <Icon name="rocket" size={30} color="#900" /> */}
      {/* <SvgIcon style={{color: 'red'}} /> */}
      <CheckIcon color="black" size="5" mt="0.5" />
      <TouchableOpacity onPress={onButtonClick}>
        <Text style={{fontFamily: fonts.PRIMARY_FONT_BOLD}}>Hello</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
