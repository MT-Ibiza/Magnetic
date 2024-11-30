import IcoMoon, { IconProps } from 'react-icomoon';
import iconSet from '../assets/icons.json';

export function Icon(props: IconProps) {
  return <IcoMoon iconSet={iconSet} {...props} />;
}
export default Icon;
