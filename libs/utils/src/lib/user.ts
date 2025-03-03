export function getNameFromUsername(firstName: string, lastName?: string) {
  const firstInitial = firstName ? firstName.split(' ')[0] : 'Guest';
  const secondInitial = lastName ? lastName.split(' ').slice(-1) : '';
  return `${firstInitial} ${secondInitial}`;
}
