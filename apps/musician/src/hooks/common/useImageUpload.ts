import {
  CommonImageUploadRequestProps,
  CommonImageUploadResponseProps,
} from '@/types/api';

type GetPresignedUrlFn = (
  payload: CommonImageUploadRequestProps,
) => Promise<CommonImageUploadResponseProps>;

export const useImageUpload = (getPresignedUrl: GetPresignedUrlFn) => {
  /**
   * 파일 배열을 받아 주입받은 API를 통해 Presigned URL 정보를 반환하는 함수
   */
  const handleUploadImages = async (
    files: File[],
  ): Promise<CommonImageUploadResponseProps[]> => {
    try {
      const uploadPromises = files.map(async (file) => {
        // 이미 정의된 인터페이스(CommonImageUploadRequestProps)에 맞춰 페이로드 생성
        const requestPayload: CommonImageUploadRequestProps = {
          fileName: file.name,
          contentType: file.type,
        };

        // 훅 호출 시 주입받은 함수(getPresignedUrl)를 실행
        const response = await getPresignedUrl(requestPayload);

        return {
          fileKey: response.fileKey,
          presignedPutUrl: response.presignedPutUrl,
        };
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Presigned URL 발급 실패:', error);
      throw error;
    }
  };

  return { handleUploadImages };
};
