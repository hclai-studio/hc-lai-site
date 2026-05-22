import type { MDXComponents } from 'mdx/types';
import ProjectHeader from '@/app/components/mdx/ProjectHeader';
import Caption from '@/app/components/mdx/Caption';
import ImagePlaceholder from '@/app/components/mdx/ImagePlaceholder';
import WorkImage from '@/app/components/mdx/WorkImage';
import CaseExpandable from '@/app/components/mdx/CaseExpandable';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ProjectHeader,
    Caption,
    ImagePlaceholder,
    WorkImage,
    CaseExpandable,
  };
}
