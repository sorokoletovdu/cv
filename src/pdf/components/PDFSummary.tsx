/** @jsxImportSource react */
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PDFSectionHeader } from './PDFSectionHeader.js';
import { theme } from '../theme.js';

const s = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.body,
    color: theme.colors.dark,
    lineHeight: 1.45,
  },
});

interface Props {
  summary: string;
}

export function PDFSummary({ summary }: Props) {
  return (
    <View wrap={false}>
      <PDFSectionHeader title="Professional Summary" />
      <Text style={s.text}>{summary}</Text>
    </View>
  );
}
