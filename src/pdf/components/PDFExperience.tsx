/** @jsxImportSource react */
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { PDFSectionHeader } from './PDFSectionHeader.js';
import { theme } from '../theme.js';
import { formatDate } from '../../lib/formatDate.js';

const s = StyleSheet.create({
  entry: { marginBottom: 8 },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  titleBlock: { flexDirection: 'row', flexWrap: 'wrap', flex: 1, gap: 3 },
  entryTitle: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.entryTitle,
    fontWeight: 700,
    color: theme.colors.dark,
  },
  entryCompany: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.entryTitle,
    fontWeight: 400,
    color: theme.colors.gray,
  },
  dateRange: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.entryMeta,
    color: theme.colors.gray,
    marginLeft: 8,
  },
  locationInline: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.entryMeta,
    color: theme.colors.light,
    fontStyle: 'italic',
  },
  bullets: { gap: 1.5 },
  bulletRow: { flexDirection: 'row', gap: 5 },
  bulletMark: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.body,
    color: theme.colors.dark,
    marginTop: 0.5,
  },
  bulletText: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.body,
    color: theme.colors.gray,
    flex: 1,
    lineHeight: 1.35,
  },
});

interface ExperienceEntry {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}

interface Props {
  experience: ExperienceEntry[];
}

export function PDFExperience({ experience }: Props) {
  return (
    <View>
      <PDFSectionHeader title="Work Experience" />
      {experience.map((entry, i) => (
        <View key={i} style={s.entry} wrap={false}>
          <View style={s.entryHeader}>
            <View style={s.titleBlock}>
              <Text style={s.entryTitle}>{entry.title}</Text>
              <Text style={s.entryCompany}>, {entry.company}</Text>
              <Text style={s.locationInline}> · {entry.location}</Text>
            </View>
            <Text style={s.dateRange}>{formatDate(entry.start)} – {formatDate(entry.end)}</Text>
          </View>
          <View style={s.bullets}>
            {entry.bullets.map((bullet, j) => (
              <View key={j} style={s.bulletRow}>
                <Text style={s.bulletMark}>•</Text>
                <Text style={s.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
