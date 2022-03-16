import { FunctionalComponent, h } from "preact";
import styles from "./StepIndicator.style.css";

interface Props {
  step: 1 | 2 | 3;
}

const MAX_STEP = 3;

const StepIndicator: FunctionalComponent<Props> = ({ step }) => {
  return (
    <div class={styles.portfolio__step_indicator}>
      <div>
        <strong>Step {step}</strong>
        <span> of {MAX_STEP}</span>
      </div>
      <span
        class={styles.portfolio__step_indicator__range}
        data-step={step}
      ></span>
    </div>
  );
};

export default StepIndicator;
