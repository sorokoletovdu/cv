/** @jsxImportSource react */
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { theme } from '../theme.js';

const s = StyleSheet.create({
  wrapper: { marginTop: 10, marginBottom: 4 },
  titleRow: { flexDirection: 'row' },
  titleText: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.sizes.sectionHeader,
    fontWeight: 700,
    color: theme.colors.dark,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  rule: {
    height: 0.75,
    backgroundColor: theme.colors.rule,
    marginTop: 2,
  },
});

interface Props {
  title: string;
}

export function PDFSectionHeader({ title }: Props) {
  const accent = title.slice(0, 3);
  const rest = title.slice(3);

  return (
    <View style={s.wrapper}>
      <View style={s.titleRow}>
        <Text style={s.titleText}>{accent}</Text>
        <Text style={s.titleText}>{rest}</Text>
      </View>
      <View style={s.rule} />
    </View>
  );
}
