import { Des } from './des'

export class TriDes {

    encrypt(sKey:Uint8Array, raw_text:string){

        //assume skey is size 24 byte (168 bit)
        let key1 = sKey.subarray(0, 8);
        let key2 = sKey.subarray(8, 16);
        let key3 = sKey.subarray(16, 25);

        let des = new Des();
        let text;

        //encrypy with key 1
        text = des.encrypt(key1, raw_text);
        
        //decrypy with key 2
        text = des.decrypt(key2, text);
        
        //encrypy with key 3
        text = des.encrypt(key3, text);

        return text;
    }

    
    decrypt(sKey:Uint8Array, raw_cipher:string){

        //assume skey is size 24 byte (168 bit)
        let key1 = sKey.subarray(0, 8);
        let key2 = sKey.subarray(8, 16);
        let key3 = sKey.subarray(16, 25);

        let des = new Des();
        let text;

        //encrypy with key 3
        text = des.decrypt(key3, raw_cipher);

        //decrypy with key 2
        text = des.encrypt(key2, text);
        
        //encrypy with key 1
        text = des.decrypt(key1, text);
        
        return text;
    }

}
