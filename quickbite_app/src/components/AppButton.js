import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme';

export default function AppButton({ title, onPress, variant = 'primary', disabled = false, style }) {
  const isOutline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        isOutline && styles.outline,
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.text, isOutline && styles.outlineText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
    alignItems: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: '#fff',
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
  outlineText: {
    color: colors.primary,
  },
});
