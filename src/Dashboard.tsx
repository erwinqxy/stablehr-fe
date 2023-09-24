import { useEffect, useState } from "react";
import {
    AppShell,
    Navbar,
    Header,
    MediaQuery,
    Burger,
    useMantineTheme,
    createStyles,
    Group,
    ScrollArea,
} from '@mantine/core';
import { ReactComponent as UnlimitLogo } from './resources/assets/images/logo.svg';
import { useMediaQuery } from '@mantine/hooks';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link, useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Login } from './Login';
import { ZeroDevWeb3Auth } from '@zerodev/web3auth';
import InboxPage from './InboxPage-text';


const useStyles = createStyles((theme, _params) => {
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.xl,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      gap: 12,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  };
});

export interface DashboardProps {
  children: React.ReactNode;
  links: { path: string; label: string; icon: string | null }[];
}

export function Dashboard({ children, links }: DashboardProps) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`);
  const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`);
  const [opened, setOpened] = useState(false);
  const { pathname } = useLocation();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      const zeroDevWeb3Auth = new ZeroDevWeb3Auth([
        "1afd89c5-cb11-4b19-bf4a-f1d7fa10f6b7",
      ]);
      zeroDevWeb3Auth.getUserInfo().then(console.log);
    }
  }, [isConnected]);

    if (!isConnected) {
        return <Login />
    }
    return (
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint='sm'
        asideOffsetBreakpoint='sm'
        navbar={
          <Navbar
            p='md'
            hiddenBreakpoint='sm'
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Navbar.Section grow mt='md' component={ScrollArea}>
              {matches ? (
                <MediaQuery
                  largerThan={'sm'}
                  styles={{ paddingLeft: 20, paddingRight: 20 }}
                >
                  <Group className={classes.header} position='apart'>
                    {/* Todo: Fix this logo */}
                    {/* <img src='./assets/images/logo.png' alt="Logo" width="10%" height="10%"></img> */}
                  </Group>
                </MediaQuery>
              ) : null}
              {links.map((item) => (
                <Link
                  className={cx(classes.link, {
                    [classes.linkActive]: item.path === pathname,
                  })}
                  to={item.path}
                  key={item.label}
                  onClick={() => {
                    setOpened(false);
                  }}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </Navbar.Section>
            {mdMatches && (
              <Navbar.Section className={classes.footer}>
                <ConnectButton />
              </Navbar.Section>
            )}
          </Navbar>
        }
        header={
          matches ? undefined : (
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Header height={{ base: 50, md: 70 }} p='md'>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: '100%',
                  }}
                >
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size='sm'
                    color={theme.colors.gray[6]}
                    mr='sm'
                  />

                  <UnlimitLogo height={30} width={116} />
                </div>
              </Header>
            </MediaQuery>
          )
        }
      >
        <InboxPage />
        {children}
      </AppShell>
    );
}
