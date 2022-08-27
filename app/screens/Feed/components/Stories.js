import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import {add, five, four, one, three, two} from '../../../assets/appImages';

const Stories = () => (
  <ScrollView style={{flexDirection: 'row', marginVertical: 15}} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingBottom: 10}}>
    {[one, two, three, four, five, two, three, four, five].map((story, index) => (
      <View style={{paddingLeft: 16}}>
        <Image source={story} style={{width: 50, height: 50, paddingLeft: 16}} />
        {index === 0 && <Image source={add} style={{position: 'absolute', width: 24, height: 24, top: 12, left: 29}} />}
      </View>
    ))}
  </ScrollView>
);

export default Stories;
