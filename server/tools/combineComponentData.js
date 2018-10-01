import prepareWpSectionsData from './prepareWpSectionsData';
import prepareCodeSectionsData from './prepareCodeSectionsData';

const combineComponentData = async (wpComponent, codeComponent) => {
  try {
    const { acf, id, slug } = wpComponent;
    const { pageTitle, pageSubTitle, pageHeroImage, mainDescription, mainImage, designSections, usageSections } = acf;

    const style = await prepareWpSectionsData(designSections, slug);
    const usage = await prepareWpSectionsData(usageSections, slug);
    const code = await prepareCodeSectionsData(codeComponent);

    const combineComponent = {
      id,
      slug,
      pageTitle,
      pageSubTitle,
      pageHeroImage,
      mainDescription,
      mainImage,
      style,
      usage,
      code,
    };
    return combineComponent;
  } catch (error) {
    console.error(error.message); // eslint-disable-line no-console
  }
};

export default combineComponentData;
