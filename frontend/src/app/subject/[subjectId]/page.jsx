import { subjectsData } from '../../../data/subjectsData';
import { notFound } from 'next/navigation';
import ClientSubjectPage from './ClientSubjectPage';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const subject = subjectsData[resolvedParams.subjectId];
  if (!subject) return {};

  return {
    title: subject.title,
    description: subject.description,
    openGraph: {
      title: subject.title,
      description: subject.description,
    },
  };
}

export default async function SubjectPage({ params }) {
  const resolvedParams = await params;
  const subjectId = resolvedParams.subjectId;
  const subject = subjectsData[subjectId];

  if (!subject) {
    notFound();
  }

  return <ClientSubjectPage subject={subject} />;
}
