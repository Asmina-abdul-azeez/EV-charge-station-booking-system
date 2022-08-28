import React from 'react';
import {Dimensions, View} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import styles from './styles';

const CustomBottomSheet = props => {
  const {animationOutTiming, children, customStyle, handleBackdropPress, handleSwipeDown, isStatusBarTranslucent, isVisible, modalContainerStyle, onModalHide, scrollOffset, scrollViewRef, swipeDirection} = props;

  const {width, height} = Dimensions.get('screen');

  const handleScrollTo = position => {
    scrollViewRef?.current?.scrollTo(position);
  };

  return (
    <Modal
      onModalHide={onModalHide}
      backdropOpacity={0.4}
      animationType="slide"
      isVisible={isVisible}
      swipeDirection={swipeDirection}
      deviceHeight={height}
      deviceWidth={width}
      style={[styles.modalContainer, modalContainerStyle]}
      onBackdropPress={handleBackdropPress}
      animationOutTiming={animationOutTiming}
      animationInTiming={800}
      avoidKeyboard
      onSwipeComplete={handleSwipeDown}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      statusBarTranslucent={isStatusBarTranslucent}
      propagateSwipe
      backdropColor="#E6F1EB"
    >
      <View style={[styles.modalStyle, customStyle]}>{children}</View>
    </Modal>
  );
};
CustomBottomSheet.propTypes = {
  animationOutTiming: PropTypes.number,
  children: PropTypes.node,
  customStyle: PropTypes.shape(),
  handleBackdropPress: PropTypes.func,
  handleSwipeDown: PropTypes.func,
  isStatusBarTranslucent: PropTypes.bool,
  isVisible: PropTypes.bool,
  modalContainerStyle: PropTypes.shape(),
  onModalHide: PropTypes.func,
  scrollOffset: PropTypes.number,
  scrollViewRef: PropTypes.shape(),
  swipeDirection: PropTypes.string,
};

CustomBottomSheet.defaultProps = {
  animationOutTiming: 800,
  children: null,
  customStyle: {},
  handleBackdropPress: () => {},
  handleSwipeDown: () => {},
  isStatusBarTranslucent: false,
  isVisible: false,
  modalContainerStyle: {},
  onModalHide: () => {},
  scrollOffset: 0,
  scrollViewRef: null,
  swipeDirection: 'down',
};

export default CustomBottomSheet;
