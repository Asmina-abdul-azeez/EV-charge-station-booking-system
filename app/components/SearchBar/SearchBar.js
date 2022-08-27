/* eslint-disable prettier/prettier */
import { CloseIcon } from 'native-base';
import React, {useState} from 'react';
import {FlatList, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { search } from '~assets/appImages';

const SearchBar = props => {
  // eslint-disable-next-line react/prop-types
  const {value, onChangeText, onPredictionTapped, predictions, showPredictions, onClear} = props;

  const [inputSize, setInputSize] = useState({width: 0, height: 0});

  const inputBottomRadius = showPredictions
    ? {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    }
    : {
      borderBottomLeftRadius: 9,
      borderBottomRightRadius: 9,
    };

  return (
    <View>
      <View
        onLayout={event => {
          const {height, width} = event.nativeEvent.layout;
          setInputSize({height, width});
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 9,
          backgroundColor: '#FDFDFD',
          flexDirection: 'row',
          borderColor: '#D2D2D2',
          paddingHorizontal: 16,
        }}>
        <Image source={search} style={{width: 24, height: 24}} />
        <TextInput
          style={[
            inputBottomRadius,
            {
              backgroundColor: '#FDFDFD',
              borderRadius: 9,
              color: 'black',
              fontSize: 15,
              lineHeight: 18,
              height: 48,
              flex: 1,
              paddingLeft: 12,
            },
          ]}
          placeholder="Search for a place"
          placeholderTextColor="#828282"
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
        />
        {value !== '' && <CloseIcon onPress={onClear} />}
      </View>
      {showPredictions && (
        <FlatList
          data={predictions}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                borderBottomColor: '#E0E0E0',
                borderBottomWidth: 1,
                borderRadius: 9,
              }}
              onPress={() => onPredictionTapped(item.place_id, item.description)}>
              <Text style={{fontSize: 15, lineHeight: 18, color: '#333333', paddingVertical: 18, paddingHorizontal: 18}} numberOfLines={1}>{item.description}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.place_id}
          keyboardShouldPersistTaps="handled"
          style={[
            {
              backgroundColor: '#FDFDFD',
              borderRadius: 9,
              marginTop: 4,
            },
            {width: inputSize.width},
          ]}
        />
      )}
    </View>
  );
};

export default SearchBar;
