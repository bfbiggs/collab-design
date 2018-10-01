import flattenAcfSection from './flattenAcfSection';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';

const prepareWpSectionsData = async (wpSections, slug) => {
  try {
    const sections = [];
    for (const wpSection of wpSections) {
      const flatSection = await flattenAcfSection(wpSection.sectionContent);
      const { sectionTitleText, sectionBodyContent, sectionImageArray, sectionImageDescription, sectionImageSize, sectionImagePosition } = flatSection;
      const sectionImage = get(sectionImageArray, 'url');
      const sectionId = `${slug}-${kebabCase(sectionTitleText)}`;
      const subSections = [];

      if (wpSection.subSections) {
        for (const subSection of wpSection.subSections) {
          const flatSubSection = await flattenAcfSection(subSection.subSectionContent);
          subSections.push(flatSubSection);
        }
      }
      const section = {};
      section.sectionId = sectionId || '';
      section.sectionTitleText = sectionTitleText || '';
      section.sectionBodyContent = sectionBodyContent || '';
      section.sectionImage = sectionImage || '';
      section.sectionImageDescription = sectionImageDescription || '';
      section.sectionImageSize = sectionImageSize || '6';
      section.sectionImagePosition = sectionImagePosition || 'right';
      section.subSections = subSections || false;
      sections.push(section);
    }
    return sections;
  } catch (error) {
    console.error(error.message); // eslint-disable-line no-console
  }
};

export default prepareWpSectionsData;
