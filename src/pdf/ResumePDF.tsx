/** @jsxImportSource react */
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import { PDFHeader } from './components/PDFHeader.js';
import { PDFExperience } from './components/PDFExperience.js';
import { PDFEducation } from './components/PDFEducation.js';
import { PDFSkills } from './components/PDFSkills.js';
import { theme } from './theme.js';
import type { ResumeData } from '../lib/types.js';

const s = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    paddingTop: theme.page.marginTop,
    paddingBottom: theme.page.marginBottom,
    paddingLeft: theme.page.marginLeft,
    paddingRight: theme.page.marginRight,
    fontFamily: theme.fonts.body,
    fontSize: theme.sizes.body,
  },
});

interface Props {
  data: ResumeData;
}

export function ResumePDF({ data }: Props) {
  return (
    <Document
      title={`${data.name} — CV`}
      author={data.name}
      subject="CV / Resume"
      keywords="QA, automation, engineer, resume"
    >
      <Page size="A4" style={s.page}>
        <PDFHeader
          name={data.name}
          title={data.title}
          phone={data.phone}
          email={data.email}
          linkedin={data.linkedin}
          github={data.github}
          permit={data.permit}
          languages={data.languages}
        />
        <PDFExperience experience={data.experience} />
        <PDFEducation education={data.education} />
        <PDFSkills skills={data.skills} />
      </Page>
    </Document>
  );
}
