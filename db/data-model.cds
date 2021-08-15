namespace miyasuta.media;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Files: cuid, managed{
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
}