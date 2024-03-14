import { padNumber } from './string';

const 일분은_60초 = 60;

interface PadOption {
  pad: boolean;
}

interface EachPadOption {
  secondsPad?: boolean;
  minutesPad?: boolean;
}

type Option = PadOption | EachPadOption;

export function parseSeconds(targetSeconds: number, option?: Option) {
  const secondsPadded =
    option != null ? (isPadOptionType(option) ? option.pad : option?.secondsPad) : false;
  const minutesPadded =
    option != null ? (isPadOptionType(option) ? option.pad : option?.minutesPad) : false;
  const seconds = targetSeconds % 일분은_60초;
  const minutes = (targetSeconds - seconds) / 일분은_60초;

  return {
    seconds: secondsPadded ? padNumber(seconds) : String(seconds),
    minutes: minutesPadded ? padNumber(minutes) : String(minutes),
  };
}

function isPadOptionType(option: unknown): option is PadOption {
  return (option as any).pad != null;
}
