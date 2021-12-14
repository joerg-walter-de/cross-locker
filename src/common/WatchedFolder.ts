interface WatchedFolder {


    path: string;
    includePattern: string[];
    excludePattern: string[];

}

//--------------------------------------------------------------------------------------------------

function watchedFolderToYaml(folder: WatchedFolder): string
{
    const yaml = '';
    return yaml;
}

//--------------------------------------------------------------------------------------------------

function yamlToWatchedFolder(yaml: string): WatchedFolder | null
{

    return null;
}

//--------------------------------------------------------------------------------------------------

export {
    WatchedFolder,
    watchedFolderToYaml,
    yamlToWatchedFolder
};

//--------------------------------------------------------------------------------------------------
