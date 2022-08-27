import {ScaledSheet} from 'react-native-size-matters';

const styles = ScaledSheet.create({
  modalContainer: {
    margin: -5,
  },
  modalStyle: {
    borderTopLeftRadius: '90@ms',
    borderTopRightRadius: '90@ms',
    bottom: 0,
    justifyContent: 'space-around',
    opacity: 1,
    position: 'absolute',
    width: '100%',
    zIndex: 100,
    paddingBottom: '24@mvs',
  },
});

export default styles;
