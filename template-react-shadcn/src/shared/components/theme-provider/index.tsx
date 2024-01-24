import { ThemeProviderContext } from './contexts';
import { useThemeProvider } from './hooks';
import { ThemeProviderProps } from './types';

export function ThemeProvider(props: ThemeProviderProps) {
  const { value } = useThemeProvider(props);

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {props.children}
    </ThemeProviderContext.Provider>
  );
}
