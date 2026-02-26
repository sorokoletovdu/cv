/** @jsxImportSource react */
import { View, Text, StyleSheet, Link } from '@react-pdf/renderer';
import { theme } from '../theme.js';

const s = StyleSheet.create({
  header: { alignItems: 'center', marginBottom: 10 },
  nameRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  firstName: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.sizes.name,
    fontWeight: 700,
    color: theme.colors.dark,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  lastName: {
    fontFamily: theme.fonts.heading,
    fontSize: theme.sizes.name,
    fontWeight: 400,
    color: theme.colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  jobTitle: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.jobTitle,
    fontWeight: 300,
    color: theme.colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 2.5,
    marginTop: 3,
  },
  rule: {
    width: '100%',
    height: 0.75,
    backgroundColor: theme.colors.rule,
    marginTop: 6,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
  },
  contactItem: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.contact,
    color: theme.colors.gray,
  },
  contactLink: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.contact,
    color: theme.colors.gray,
    textDecoration: 'none',
  },
  separator: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.contact,
    color: theme.colors.light,
  },
  meta: {
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.small,
    color: theme.colors.light,
    marginTop: 2,
    letterSpacing: 0.3,
  },
});

interface Props {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  permit: string;
  languages: string[];
}

export function PDFHeader({ name, title, phone, email, linkedin, github, permit, languages }: Props) {
  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ');

  const linkedinDisplay = linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, 'linkedin.com/in/').replace(/\/$/, '');
  const githubDisplay = github.replace(/https?:\/\/(www\.)?github\.com\//, 'github.com/').replace(/\/$/, '');

  return (
    <View style={s.header}>
      <View style={s.nameRow}>
        <Text style={s.firstName}>{firstName}</Text>
        <Text style={s.lastName}>{lastName}</Text>
      </View>

      <Text style={s.jobTitle}>{title}</Text>

      <View style={s.rule} />

      <View style={s.contactRow}>
        <Link src={`tel:${phone}`} style={s.contactLink}>{phone}</Link>
        <Text style={s.separator}> · </Text>
        <Link src={`mailto:${email}`} style={s.contactLink}>{email}</Link>
        <Text style={s.separator}> · </Text>
        <Link src={linkedin} style={s.contactLink}>{linkedinDisplay}</Link>
        <Text style={s.separator}> · </Text>
        <Link src={github} style={s.contactLink}>{githubDisplay}</Link>
      </View>

      <Text style={s.meta}>
        {permit}  ·  Languages: {languages.join(', ')}
      </Text>
    </View>
  );
}
