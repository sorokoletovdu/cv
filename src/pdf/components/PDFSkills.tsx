/** @jsxImportSource react */
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { SkillGroup } from '../../lib/types.js';
import { PDFSectionHeader } from './PDFSectionHeader.js';
import { theme } from '../theme.js';

const s = StyleSheet.create({
  row: { flexDirection: 'row', marginBottom: 2 },
  category: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.body,
    fontWeight: 700,
    color: theme.colors.dark,
    width: 110,
    flexShrink: 0,
  },
  items: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.body,
    color: theme.colors.gray,
    flex: 1,
    lineHeight: 1.3,
  },
});

interface Props {
  skills: SkillGroup[];
}

export function PDFSkills({ skills }: Props) {
  return (
    <View>
      <PDFSectionHeader title="Skills" />
      {skills.map((group, i) => (
        <View key={i} style={s.row}>
          <Text style={s.category}>{group.category}:</Text>
          <Text style={s.items}>{group.items.join(', ')}</Text>
        </View>
      ))}
    </View>
  );
}
