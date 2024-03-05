import { LinkButton, Heading, Stack, Box, Article } from 'tailwind-admin';
import notFoundImage from '../assets/not-found.svg';

function NotFoundPage({ link }) {
    return (
        <Box>
            <Stack align="center">
                <img src={notFoundImage} width="400" height="400" alt="Not found page." />
                <Heading variant="h2">
                    Страница не найдена
                </Heading>
                <Article>
                    Страница, которую вы ищете, перемещена, удалена или не существует.
                </Article>
                <LinkButton style="primary">
                    {link}
                </LinkButton>
            </Stack>
        </Box>
    )
}

export default NotFoundPage;