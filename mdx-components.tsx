import type { MDXComponents } from 'mdx/types';
import ProjectHeader from '@/app/components/mdx/ProjectHeader';
import Hero from '@/app/components/mdx/Hero';
import Caption from '@/app/components/mdx/Caption';
import ImagePlaceholder from '@/app/components/mdx/ImagePlaceholder';
import WorkImage from '@/app/components/mdx/WorkImage';
import CaseExpandable from '@/app/components/mdx/CaseExpandable';
import JudgmentCard from '@/app/components/mdx/JudgmentCard';
import DecisionTable from '@/app/components/mdx/DecisionTable';
import StatRow from '@/app/components/mdx/StatRow';
import CompareBars from '@/app/components/mdx/CompareBars';
import FigureCaption from '@/app/components/mdx/FigureCaption';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ProjectHeader,
    Hero,
    Caption,
    ImagePlaceholder,
    WorkImage,
    CaseExpandable,
    JudgmentCard,
    DecisionTable,
    StatRow,
    CompareBars,
    FigureCaption,
  };
}
