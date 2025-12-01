import ComponentSpinner, { Props as ComponentSpinnerProps } from './component';
import PageSpinner, { Props as PageSpinnerProps } from './page';

type PageSpinner = { variant?: 'page' } & PageSpinnerProps;
type ComponentSpinner = { variant: 'component' } & ComponentSpinnerProps;

type ProgressBarProps = PageSpinner | ComponentSpinner;

const Spinner = (props: ProgressBarProps) => {
  switch (props.variant) {
    case 'component':
      return <ComponentSpinner {...props} />;
    case 'page':
    default:
      return <PageSpinner {...props} />;
  }
};

export default Spinner;
