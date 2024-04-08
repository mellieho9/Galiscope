import supabase from "./supabase.service";

export const uploadFile = async ({
  bucket,
  file,
  path,
  fileOptions,
}: {
  bucket: string,
  file: any,
  path: string,
  fileOptions?: any,
}) => {
  const response = await supabase.storage
    .from(bucket)
    .upload(path, file, fileOptions);

  return response;
};

export const removeFile = async ({
  bucket,
  path,
}: {
  bucket: string,
  path: string | string[],
}) => {
  const isArrayOfPaths = Array.isArray(path);

  const response = await supabase
    .storage
    .from(bucket)
    .remove(isArrayOfPaths ? path : [path]);

  return response;
};

export const downloadFile = async ({ bucket, path }: { bucket: string, path: string }) => {
  const response = await supabase
    .storage
    .from(bucket)
    .download(path);

  const { data: blob } = response;

  return blob;
};

export const getSignedUrl = async ({ path, bucket }: { bucket: string, path: string }) => {
  const oneDayInSeconds = 60 * 60 * 24;

  const { error, data: urlData } = await supabase
    .storage
    .from(bucket)
    .createSignedUrl(path, oneDayInSeconds);

  if (error) throw error;

  return urlData?.signedUrl;
};
