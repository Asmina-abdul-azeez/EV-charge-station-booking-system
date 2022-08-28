import React from 'react';
import {View} from 'react-native';
import Header from './components/Header';
import Posts from './components/Posts';
import Stories from './components/Stories';

const Feed = () => (
  <View style={{backgroundColor: 'white'}}>
    <Header />
    <Stories />
    <Posts />
  </View>
);

export default Feed;
