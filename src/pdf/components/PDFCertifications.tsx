/** @jsxImportSource react */
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { CertificationEntry } from '../../lib/types.js';
import { PDFSectionHeader } from './PDFSectionHeader.js';
import { theme } from '../theme.js';

const s = StyleSheet.create({
  entry: { marginBottom: 2 },
  name: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.entryTitle,
    color: theme.colors.dark,
  },
  status: {
    color: theme.colors.gray,
  },
});

interface Props {
  certifications: CertificationEntry[];
}

export function PDFCertifications({ certifications }: Props) {
  return (
    <View>
      <PDFSectionHeader title="Certifications" />
      {certifications.map((entry, i) => (
        <View key={i} style={s.entry}>
          <Text style={s.name}>
            {entry.name}
            <Text style={s.status}> — {entry.status}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
}
