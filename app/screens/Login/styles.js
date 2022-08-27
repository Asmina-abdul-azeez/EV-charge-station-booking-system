import {ScaledSheet} from 'react-native-size-matters';
import {Colors, fonts} from '~utilities/Constants';

const styles = ScaledSheet.create({
  image: {
    height: '239@s',
    width: '305@ms',
    alignSelf: 'center',
    marginBottom: '50@mvs',
  },
  root: {
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontFamily: fonts.PRIMARY_FONT_BOLD,
    fontSize: '24@ms',
    lineHeight: '28@mvs',
    color: Colors.BLACK,
    marginBottom: '10@mvs',
  },
  subTitle: {
    color: Colors.GREY,
    fontSize: '22@ms',
    lineHeight: '25@mvs',
    fontFamily: fonts.PRIMARY_FONT_REGULAR,
    marginBottom: '12@mvs',
  },
  label: {
    fontFamily: fonts.PRIMARY_FONT_REGULAR,
    fontSize: '15@ms',
    lineHeight: '17@mvs',
    color: Colors.GREY,
    marginBottom: '8@mvs',
    marginTop: '24@mvs',
  },
  input: {
    borderWidth: '1@s',
    height: '54@mvs',
    width: '100%',
    borderRadius: '10@s',
    borderColor: Colors.GAINSBORO,
    paddingHorizontal: '8@ms',
    fontSize: '15@ms',
    lineHeight: '17@mvs',
    color: Colors.NIGHT_RIDER,
    justifyContent: 'space-between',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: '10@mvs',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  focused: {
    borderColor: Colors.TURQUOISE,
  },
  button: {
    height: '54@mvs',
    width: '100%',
    borderRadius: '10@s',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '32@mvs',
  },
  buttonText: {
    fontFamily: fonts.PRIMARY_FONT_BOLD,
  },
  contentContainer: {
    paddingBottom: '40@mvs',
    paddingTop: '16@mvs',
    paddingHorizontal: '16@ms',
  },
});

export default styles;
