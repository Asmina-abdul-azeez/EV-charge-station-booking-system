import {ScaledSheet} from 'react-native-size-matters';
import {Colors, fonts} from '~utilities/Constants';

const styles = ScaledSheet.create({
  image: {
    height: '193@s',
    width: '193@s',
    alignSelf: 'center',
    marginBottom: '34@mvs',
  },
  title: {
    fontFamily: fonts.PRIMARY_FONT_BOLD,
    fontSize: '36@ms',
    lineHeight: '46@mvs',
    color: Colors.BLACK,
    alignSelf: 'center',
  },
  subTitle: {
    fontFamily: fonts.PRIMARY_FONT_REGULAR,
    fontSize: '14@ms',
    lineHeight: '24@mvs',
    color: Colors.NOBEL,
    alignSelf: 'center',
    marginBottom: '60@mvs',
  },
  smallText: {
    color: Colors.BLACK,
    fontSize: '12@ms',
    fontFamily: fonts.PRIMARY_FONT_BOLD,
    marginBottom: 0,
  },
  stationImage: {
    height: '48@s',
    width: '48@s',
    marginRight: '12@ms',
    borderRadius: '8@s',
  },
  location: {
    fontFamily: fonts.PRIMARY_FONT_BOLD,
    fontSize: '20@ms',
    lineHeight: '24@mvs',
    color: Colors.BLACK,
  },
  review: {
    color: Colors.GREY,
    fontFamily: fonts.PRIMARY_FONT_REGULAR,
    fontSize: '9@ms',
    lineHeight: '24@mvs',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  root: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: '16@ms',
    flex: 1,
  },
  card: {
    backgroundColor: Colors.SNOW,
    borderRadius: '15@s',
    paddingHorizontal: '30@ms',
    paddingVertical: '22@mvs',
    marginTop: '14@mvs',
  },
  star: {
    marginRight: '8@ms',
  },
  divider: {
    height: '0.5@vs',
    backgroundColor: Colors.SILVER,
    width: '100%',
    marginTop: '21@mvs',
    marginBottom: '16@mvs',
  },
  iconContainer: {
    paddingHorizontal: '39@ms',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    height: '56@mvs',
    borderRadius: '10@s',
    marginTop: '44@mvs',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: fonts.PRIMARY_FONT_BOLD,
    fontSize: '14@ms',
    lineHeight: '24@mvs',
    color: Colors.BLACK
  },
  contentContainer: {
    paddingBottom: '40@mvs',
    paddingTop: '16@mvs',
  },
});

export default styles;
