
// to change later
declare const CSSUnitValue;

// declare const History: any;
// declare const ACTIONS: import('./assets/js/data/actions').Actions;
// declare const Content: import('./assets/js/data/content/index').ContentType;
// declare const Links: import('./assets/js/data/content/links').LinksType;
declare const SafeDate: (v: string|Date) => string;
// declare const $crisp;

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

declare namespace NodeJS {
  export type ProcessEnv = {
    NODE_ENV: 'development' | 'production'
    // MIXPANEL_KEY: string
    // PUBLIC_PATH: string
    // API_URL: string
    // CF_PAGES_BRANCH: string
    // CF_PAGES_COMMIT_SHA: string
    // STRIPE_API_KEY: string
    // GOOGLE_APP_CLIENT_ID: string
    // SOCKETS_URL: string
    // SUPPORT_EMAIL: string
  }
}

// declare module '*.css' {
//   const css: { [key: string]: string };
//   export default css;
// }
declare module '*.html' {
  const html: string;
  export default html;
}
declare module '*.scss' {
  const css: { [key: string]: string };
  export default css;
}
declare module '*.svg';
declare module '*.png';

interface MouseEvent {
	canceler: any
}

type HttpError = {
	message: string
	key: string
	path: string[]
	name: string
}

interface Window {
  modals: HTMLDivElement
  app: HTMLDivElement
  alerts: HTMLDivElement
  bindingMessage: HTMLDivElement
  overlay: HTMLDivElement
}
interface Document {
  exitFullscreen: () => void;
  webkitExitFullscreen: () => void;
  msExitFullscreen: () => void;
  webkitIsFullScreen
  mozFullScreen
  msFullscreenElement
}
interface HTMLElement {
  webkitRequestFullscreen: () => void
  msRequestFullscreen: () => void
}

type CreateNonNullable<Type> = Required<{
  [Property in keyof Type]: Omit<Type[Property], undefined>;
}>;

type SplitTestStepSettings = {
  links: {
    weight: number
    enabled: boolean
    destination: undefined | {
    	type: DestinationType
    	value: undefined|null|number
    }
    id: string
  }[]
  custom_weight: boolean
  auto_choose_winner: boolean
  auto_choose_winner_after: number
};
type NonSplitTestStepSettings = {
  seo?: {
    title?: string
    description?: string
    keywords?: string
  }
  custom_html?: {
    header?: string
    footer?: string
  }
}
type StepSettings = SplitTestStepSettings | NonSplitTestStepSettings

type WebhookSettings = {segments_ids?: number[]}

type FunnelPaymentGatewaySettings = {
		stripePaymentMethods?: import('./shared/variables/account').StripePaymentMethod["value"][]
		stripeCountry?: import('./shared/variables/countries').Country["value"]
	}

type Option = {label: string, value: string|number|undefined|null}