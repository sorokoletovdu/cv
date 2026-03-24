/** @jsxImportSource react */
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { EducationEntry } from '../../lib/types.js';
import { PDFSectionHeader } from './PDFSectionHeader.js';
import { theme } from '../theme.js';

const s = StyleSheet.create({
  entry: { marginBottom: 4 },
  degree: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.entryTitle,
    fontWeight: 700,
    color: theme.colors.dark,
  },
  school: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.body,
    color: theme.colors.gray,
    marginTop: 1,
  },
  location: {
    color: theme.colors.light,
  },
});

interface Props {
  education: EducationEntry[];
}

export function PDFEducation({ education }: Props) {
  return (
    <View wrap={false}>
      <PDFSectionHeader title="Education" />
      {education.map((entry, i) => (
        <View key={i} style={s.entry}>
          <Text style={s.degree}>{entry.degree}</Text>
          <Text style={s.school}>
            {entry.school}
            {entry.year && <Text style={s.location}> · {entry.year}</Text>}
          </Text>
        </View>
      ))}
    </View>
  );
}
