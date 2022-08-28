import React from 'react';
import {Image, Text, View} from 'react-native';
import {burger, notification, plus} from '../../../assets/appImages';
import {fonts} from '../../../utilities/Constants';

// eslint-disable-next-line react/prop-types
const Header = ({title}) => (
  <View style={{paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#E6E6E6'}}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image source={burger} style={{width: 24, height: 24}} />
      <Text style={{paddingLeft: 20, fontSize: 20, color: '#1A1A1A', fontFamily: fonts.PRIMARY_FONT_BOLD, textAlignVertical: 'center'}}>{title || 'Feeds'}</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
      <Image source={plus} style={{width: 24, height: 24}} />
      <Image source={notification} style={{width: 24, height: 24, marginLeft: 18}} />
    </View>
  </View>
);

export default Header;
