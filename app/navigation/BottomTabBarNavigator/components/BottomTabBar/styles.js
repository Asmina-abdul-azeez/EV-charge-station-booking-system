import {ScaledSheet} from 'react-native-size-matters';
import {Colors, fonts} from '~utilities/Constants';

const styles = ScaledSheet.create({
  root: {
    paddingHorizontal: '24@ms',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '79@mvs',
    backgroundColor: Colors.WHITE,
    borderTopWidth: '1@s',
    borderTopColor: Colors.WHISPER,
  },
  selectedIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '23@s',
    backgroundColor: Colors.TURQUOISE,
    width: '125@s',
    justifyContent: 'center',
    height: '46@s',
  },
  label: {
    fontFamily: fonts.PRIMARY_FONT_REGULAR,
    fontSize: '15@ms',
    lineHeight: '18@mvs',
    marginLeft: '8@ms',
    color: Colors.BLACK,
  },
  iconContainer: {
    height: '46@s',
    width: '46@s',
    borderRadius: '23@s',
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
