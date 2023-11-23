declare module 'tailwind-rn' {
    export * from 'tailwind-rn';
  
    interface Props {
      utilities: Utilities;
      colorScheme?: ColorSchemeName;
      children?: React.ReactNode | React.ReactNode[]
    }
  
    export const TailwindProvider: React.FC<Props>;
  }