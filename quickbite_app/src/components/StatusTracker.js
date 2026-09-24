import { StyleSheet, Text, View } from 'react-native';
import { ORDER_STATUSES } from '../context/OrderContext';
import { colors, fontSizes, spacing } from '../theme/theme';

export default function StatusTracker({ status }) {
  const currentIndex = ORDER_STATUSES.indexOf(status);

  return (
    <View>
      {ORDER_STATUSES.map((step, index) => {
        const isDone = index <= currentIndex;
        const isLast = index === ORDER_STATUSES.length - 1;

        return (
          <View key={step} style={styles.step}>
            <View style={styles.indicator}>
              <View style={[styles.circle, isDone && styles.circleDone]}>
                <Text style={styles.circleText}>{isDone ? '✓' : index + 1}</Text>
              </View>
              {!isLast && <View style={[styles.line, index < currentIndex && styles.lineDone]} />}
            </View>
            <Text style={[styles.label, isDone && styles.labelDone]}>{step}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  step: {
    flexDirection: 'row',
  },
  indicator: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDone: {
    backgroundColor: colors.success,
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  line: {
    width: 3,
    height: 36,
    backgroundColor: colors.border,
  },
  lineDone: {
    backgroundColor: colors.success,
  },
  label: {
    fontSize: fontSizes.body,
    color: colors.textLight,
    marginTop: 6,
  },
  labelDone: {
    color: colors.text,
    fontWeight: '600',
  },
});
