import { Octokit } from 'octokit';

const isString = (value: unknown): value is string => typeof value === 'string';

export const getFilesSource = async (
    owner: string,
    repo: string,
    path: string,
    token?: string,
    branchName?: string,
): Promise<string> => {
    const octokit = new Octokit({
        auth: token,
    });

    const getFileSource = async (path: string) => {
        try {
            const result = await octokit.rest.repos.getContent({
                headers: {
                    accept: 'application/vnd.github.v3.raw',
                },
                owner,
                repo,
                path,
                ref: branchName,
            });

            return result.data;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    };

    const filesSource = await getFileSource(path);

    return isString(filesSource) ? filesSource : '';
};
