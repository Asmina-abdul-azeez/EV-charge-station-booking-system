import React from 'react';
import {Image, Text, View} from 'react-native';
import {carIcon, logout, myBooking, right, setting, user} from '../../assets/appImages';
import {fonts} from '../../utilities/Constants';
import Header from '../Feed/components/Header';

const items = [
  {
    id: 1,
    label: 'Vehicle Details',
    src: carIcon,
  },
  {
    id: 2,
    label: 'My Bookings',
    src: myBooking,
  },
  {
    id: 3,
    label: 'Settings',
    src: setting,
  },
  {
    id: 4,
    label: 'Logout',
    src: logout,
  },
];

const Profile = () => (
  <View style={{backgroundColor: 'white'}}>
    <Header title="Profile" />
    <View style={{marginTop: 16, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 16}}>
      <Image source={user} style={{width: 113, height: 113}} />
      <Text style={{fontSize: 20, fontFamily: fonts.PRIMARY_FONT_SEMI_BOLD, color: 'black'}}>Anton Galitch</Text>
      <Text style={{fontSize: 15, fontFamily: fonts.PRIMARY_FONT_REGULAR, color: '#828282', paddingTop: 4}}>@antongal</Text>
      <View style={{borderWidth: 1, borderColor: '#26E7BF', borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12, marginTop: 9, paddingVertical: 4}}>
        <Text style={{fontSize: 15, fontFamily: fonts.PRIMARY_FONT_REGULAR, color: 'black', textAlign: 'center'}}>Edit Profile</Text>
      </View>
    </View>
    {items.map(item => (
      <View style={{flexDirection: 'row', padding: 14, justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={item.src} style={{width: 14, height: 14}} />
          <Text style={{fontSize: 15, fontFamily: fonts.PRIMARY_FONT_REGULAR, color: 'black', paddingLeft: 12}}>{item.label}</Text>
        </View>
        {item.id !== 4 && <Image source={right} style={{width: 16, height: 16}} />}
      </View>
    ))}
  </View>
);

export default Profile;
