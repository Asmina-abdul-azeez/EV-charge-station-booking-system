import {ScaledSheet} from 'react-native-size-matters';
import {Colors, fonts} from '~utilities/Constants';

const styles = ScaledSheet.create({
  text: {
    fontFamily: fonts.PRIMARY_FONT_REGULAR,
    fontSize: '15@ms',
    lineHeight: '18@mvs',
    color: Colors.BLACK,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
