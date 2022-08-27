import {ScaledSheet} from 'react-native-size-matters';

import {Colors, fonts} from '~utilities/Constants';

const styles = ScaledSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: Colors.BLACK,
    fontFamily: fonts.PRIMARY_FONT_BOLD,
    fontSize: '20@ms',
    lineHeight: '24@mvs',
    marginBottom: '5@mvs',
  },
  subTitle: {
    fontFamily: fonts.PRIMARY_FONT_REGULAR,
    fontSize: '15@ms',
    lineHeight: '18@mvs',
    color: Colors.GREY,
    flexWrap: 'wrap',
  },
  blackText: {
    color: Colors.BLACK,
  },
  date: {
    fontFamily: fonts.PRIMARY_FONT_REGULAR,
    fontSize: '14@ms',
    lineHeight: '16@mvs',
    color: Colors.NIGHT_RIDER,
  },
  calendarContainer: {
    justifyContent: 'space-between',
  },
  dateContainer: {
    height: '28@mvs',
    width: '138@s',
    borderColor: Colors.SILVER,
    borderRadius: '8@s',
    borderWidth: 1,
    justifyContent: 'space-between',
    paddingHorizontal: '8@ms',
  },
  textContainer: {
    flex: 1,
  },
  image: {
    height: '72@s',
    width: '72@s',
    borderRadius: '8@s',
    marginRight: '16@ms',
  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: '20@s',
    borderTopRightRadius: '20@s',
    paddingHorizontal: '16@ms',
  },
  attributeText: {
    fontFamily: fonts.PRIMARY_FONT_REGULAR,
    fontSize: '14@ms',
    lineHeight: '16@mvs',
    color: Colors.MATTERNHORN,
    marginLeft: '2@ms',
  },
  attributeContainer: {
    justifyContent: 'space-between',
  },
  divider: {
    height: '1@vs',
    backgroundColor: Colors.GAINSBORO,
    width: '100%',
    marginVertical: '14@mvs',
  },
  slotContainer: {
    height: '28@mvs',
    width: '101@s',
    borderRadius: '8@s',
    borderColor: Colors.SILVER,
    borderWidth: '1@s',
    backgroundColor: Colors.WHITE_SMOKE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10@mvs',
  },
  availableSlot: {
    borderColor: Colors.BRIGHT_TURQUOISE,
    backgroundColor: Colors.WHITE,
  },
  slotRow: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE_SMOKE,
    borderRadius: '10@s',
    padding: '10@ms',
    marginVertical: '12@mvs',
  },
  selectedSlot: {
    backgroundColor: Colors.TURQUOISE,
  },
  stationDetails: {
    marginBottom: '14@mvs',
  },
  slotText: {
    color: Colors.SILVER,
    fontFamily: fonts.PRIMARY_FONT_REGULAR,
    fontSize: '12@ms',
    lineHeight: '14@mvs',
  },
  cancel: {
    width: '148@ms',
    height: '45@mvs',
    borderRadius: '10@s',
    borderWidth: 1,
    borderColor: Colors.TURQUOISE,
  },
  book: {
    height: '45@mvs',
    width: '189@ms',
    borderRadius: '10@s',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enabledButton: {
    // opacity: 1
  },
  slider: {
    backgroundColor: Colors.LIGHT_GREY,
    height: '5@mvs',
    width: '80@s',
    marginTop: '11@mvs',
    marginBottom: '20@mvs',
    borderRadius: '30@s',
    alignSelf: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  banner: {
    position: 'absolute',
    bottom: '4@s',
    left: '15@s',
    borderRadius: '8@s',
    paddingHorizontal: '8@ms',
    backgroundColor: Colors.BRIGHT_TURQUOISE,
  },
  bannerText: {
    color: Colors.BLACK,
    fontFamily: fonts.PRIMARY_FONT_REGULAR,
    fontSize: '10@ms',
    lineHeight: '12@mvs',
  },
});

export default styles;
