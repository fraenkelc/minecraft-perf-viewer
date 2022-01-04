import JSZip from 'jszip';

export interface DimData {
  chunkEntityCsv: string;
  entityCsv: string;
  blockCsv: string;
}
export interface ZipContents {
  profileData: string;
  dimData: Map<string, DimData>;
}

export class ZipHandler {
  static async fromFile(file: ArrayBuffer): Promise<ZipContents> {
    return new Promise<ZipContents>((resolve, reject) => {
      JSZip.loadAsync(file)
        .then((zip) => {
          const levels = zip
            .filter(
              (relativePath: string, file: JSZip.JSZipObject) =>
                relativePath.startsWith('server/levels/minecraft/') &&
                relativePath.length > 'server/levels/minecraft/'.length &&
                file.dir
            )
            .map((value) => {
              const match = /\/([^/]+)\/$/.exec(value.name);
              if (match) return match[1];
              else null;
            })
            .filter((value) => value) as string[];

          const profileDataPromise =
            zip.file('server/profiling.txt')?.async('text') ?? '';
          const dimDataPromise = new Promise<Map<string, DimData>>(
            (resolve, reject) => {
              const dimData = new Map<string, DimData>();
              const parts = [];
              for (const level of levels) {
                const chunkEntityCsv = zip
                  .file(`server/levels/minecraft/${level}/entity_chunks.csv`)
                  ?.async('text');
                const entityCsv = zip
                  .file(`server/levels/minecraft/${level}/entities.csv`)
                  ?.async('text');
                const blockCsv = zip
                  .file(`server/levels/minecraft/${level}/block_entities.csv`)
                  ?.async('text');
                const part = Promise.all([
                  chunkEntityCsv,
                  entityCsv,
                  blockCsv,
                ]).then((data) => {
                  if (data) {
                    const [chunkEntityCsv, entityCsv, blockCsv] = data;
                    dimData.set(level, {
                      chunkEntityCsv: chunkEntityCsv ?? '',
                      entityCsv: entityCsv ?? '',
                      blockCsv: blockCsv ?? '',
                    });
                  }
                });
                parts.push(part);
              }
              Promise.all(parts)
                .then(() => resolve(dimData))
                .catch((e) => reject(e));
            }
          );
          Promise.all([dimDataPromise, profileDataPromise])
            .then((data) => {
              if (data) {
                const [dimData, profileData] = data;
                resolve({ profileData, dimData });
              }
            })
            .catch((e) => reject(e));
        })
        .catch((e) => reject(e));
    });
  }
}
