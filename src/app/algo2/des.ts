import { sanitizeIdentifier } from '@angular/compiler';

export class Des {

    readonly init_premuitation:number[][] = [
        [58, 50, 42, 34, 26, 18, 10, 2],
        [60, 52, 44, 36, 28, 20, 12, 4],
        [62, 54, 46, 38, 30, 22, 14, 6],
        [64, 56, 48, 40, 32, 24, 16, 8],
        [57, 49, 41, 33, 25, 17, 9, 1],
        [59, 51, 43, 35, 27, 19, 11, 3],
        [61, 53, 45, 37, 29, 21, 13, 5],
        [63, 55, 47, 39, 31, 23, 15, 7]
    ];

    readonly final_premuitation:number[][] = [
        [40, 8, 48, 16, 56, 24, 64, 32],
        [39, 7, 47, 15, 55, 23, 63, 31],
        [38, 6, 46, 14, 54, 22, 62, 30],
        [37, 5, 45, 13, 53, 21, 61, 29],
        [36, 4, 44, 12, 52, 20, 60, 28],
        [35, 3, 43, 11, 51, 19, 59, 27],
        [34, 2, 42, 10, 50, 18, 58, 26],
        [33, 1, 41, 9, 49, 17, 57, 25]
    ];

    readonly expansion: number[][] = [
        [32, 1,  2,  3,  4,   5],
        [4,  5,  6,  7,  8,   9],
        [8,  9,  10, 11, 12, 13],
        [12, 13, 14, 15, 16, 17],
        [16, 17, 18, 19, 20, 21],
        [20, 21, 22, 23, 24, 25],
        [24, 25, 26, 27, 28, 29],
        [28, 29, 30, 31, 32,  1]
    ]

    readonly sBoxs = [
        [
            [14, 4, 13, 1,  2, 15, 11, 8,  3, 10,  6, 12,  5, 9,  0, 7],
            [0, 15,  7, 4, 14, 2, 13, 1, 10, 6, 12, 11,  9, 5,  3, 8],
            [4, 1, 14, 8, 13, 6,  2, 11, 15, 12,  9, 7,  3, 10,  5, 0],
            [15, 12,  8, 2,  4, 9,  1, 7,  5, 11,  3, 14, 10, 0,  6, 13]
        ],

        [
            [15, 1,  8, 14,  6, 11,  3, 4,  9, 7,  2, 13, 12, 0,  5, 10],
            [3, 13,  4, 7, 15, 2,  8, 14, 12, 0,  1, 10,  6, 9, 11, 5],
            [0, 14,  7, 11, 10, 4, 13, 1,  5, 8, 12, 6,  9, 3,  2, 15],
           [13, 8, 10, 1,  3, 15,  4, 2, 11, 6,  7, 12,  0, 5, 14, 9]
        ],

        [
            [10, 0,  9, 14,  6, 3, 15, 5,  1, 13, 12, 7, 11, 4,  2, 8],
            [13, 7,  0, 9,  3, 4,  6, 10,  2, 8,  5, 14, 12, 11, 15, 1],
            [13, 6,  4, 9,  8, 15,  3, 0, 11, 1,  2, 12,  5, 10, 14, 7],
             [1, 10, 13, 0,  6, 9,  8, 7,  4, 15, 14, 3, 11, 5,  2, 12]
        ],

        [
           [ 7, 13, 14, 3,  0, 6,  9, 10,  1, 2,  8, 5, 11, 12,  4, 15],
            [13, 8, 11, 5,  6, 15,  0, 3,  4, 7,  2, 12,  1, 10, 14, 9],
            [10, 6,  9, 0, 12, 11,  7, 13, 15, 1,  3, 14,  5, 2,  8, 4],
             [3, 15,  0, 6, 10, 1, 13, 8,  9, 4,  5, 11, 12, 7,  2, 14]
        ],

        [
            [2, 12,  4, 1,  7, 10, 11, 6,  8, 5,  3, 15, 13, 0, 14, 9],
            [14, 11,  2, 12,  4, 7, 13, 1,  5, 0, 15, 10,  3, 9,  8, 6],
            [ 4, 2,  1, 11, 10, 13,  7, 8, 15, 9, 12, 5,  6, 3,  0, 14],
            [11, 8, 12, 7,  1, 14,  2, 13,  6, 15,  0, 9, 10, 4,  5, 3]
        ],

        [
            [12, 1, 10, 15,  9, 2,  6, 8,  0, 13,  3, 4, 14, 7,  5, 11],
            [10, 15,  4, 2,  7, 12,  9, 5,  6, 1, 13, 14,  0, 11,  3, 8],
            [ 9, 14, 15, 5,  2, 8, 12, 3,  7, 0,  4, 10,  1, 13, 11, 6],
            [ 4, 3,  2, 12,  9, 5, 15, 10, 11, 14,  1, 7,  6, 0,  8, 13]
        ],

        [
            [4, 11,  2, 14, 15, 0,  8, 13,  3, 12,  9, 7,  5, 10,  6, 1],
            [13, 0, 11, 7,  4, 9,  1, 10, 14, 3,  5, 12,  2, 15,  8, 6],
            [ 1, 4, 11, 13, 12, 3,  7, 14, 10, 15,  6, 8,  0, 5,  9, 2],
            [ 6, 11, 13, 8,  1, 4, 10, 7,  9, 5,  0, 15, 14, 2,  3, 12]
        ],

        [
            [13, 2,  8, 4,  6, 15, 11, 1, 10, 9,  3, 14,  5, 0, 12, 7],
            [1, 15, 13, 8, 10, 3,  7, 4, 12, 5,  6, 11,  0, 14,  9, 2],
            [7, 11,  4, 1,  9, 12, 14, 2,  0, 6, 10, 13, 15, 3,  5, 8],
            [2, 1, 14, 7,  4, 10,  8, 13, 15, 12,  9, 0,  3, 5,  6, 11]
        ]
    ]
    

    readonly pc_1: number[][] = [
        [57,  49,  41,  33,  25,  17,  9 ],
        [1,   58,  50,  42,  34,  26,  18], 
        [10,  2,   59,  51,  43,  35,  27],
        [19,  11,  3,   60,  52,  44,  36], 
        [63,  55,  47,  39,  31,  23,  15], 
        [7,   62,  54,  46,  38,  30,  22],
        [14,  6,   61,  53,  45,  37,  29], 
        [21,  13,  5,   28,  20,  12,  4 ]
    ]

    readonly permutation_32: number[][] = [
        [16,  7, 20, 21, 29, 12, 28, 17],
        [ 1, 15, 23, 26,  5, 18, 31, 10],
        [ 2,  8, 24, 14, 32, 27,  3,  9],
        [19, 13, 30,  6, 22, 11,  4, 25]
    ]

    readonly l_shifts = {
        1: 1, 2: 1, 3: 2, 4: 2, 5: 2,
        6: 2, 7: 2, 8: 2, 9: 1, 10: 2,
        11: 2, 12: 2, 13: 2, 14: 2,
        15: 2, 16: 1,
    }

    readonly k_compress = [
        [14,  17,  11,  24,   1,   5],
        [3,   28,  15,   6,  21,  10],
        [23,  19,  12,   4,  26,   8],  
        [16,   7,  27,  20,  13,   2],
        [41,  52,  31,  37,  47,  55],
        [30,  40,  51,  45,  33,  48],  
        [44,  49,  39,  56,  34,  53], 
        [46,  42,  50,  36,  29,  32]
    ]

    generate_secret_key(size: number):string{

        let sKey = "";
        let r;

        for(let i = 0; i < size; i++){
            // ascii 126 = last printable char and 33 is first
            r = Math.floor(Math.random() * Math.floor(127 - 33)) + 33; 
            sKey += String.fromCharCode(r)
        }

        //check parity
        return sKey
    }

    parity_check(sKey_str: string):Boolean{

        return false
    }

    encrypt(sKey:Uint8Array, raw_text:string){

        // divide raw text into blocks    
        let blocks = this.str2block(raw_text);
        let cipher_blocks = new Array<Uint8Array>();
        let temp_block, swap_block;
        
        // generate 16 48bits temp keys
        let temp_keys = this.generate_subkeys(sKey);
        
        // encrypt n blocks
        for(let block of blocks){
            
            //init perm
            temp_block = this.map_to_table(block, this.init_premuitation);
            
            // 16 rounds
            for(let i = 0; i < 16; i++){
                temp_block = this.des_f(temp_block, temp_keys[i]);

            }

            //swap left and right
            swap_block = temp_block.slice(4,8);
            temp_block.set(temp_block.slice(0,4), 4);
            temp_block.set(swap_block); 
            
            //final perm
            temp_block = this.map_to_table(temp_block, this.final_premuitation);

            cipher_blocks.push(temp_block);

        }

        // turn cipher block into cipher text
        return this.block2str(cipher_blocks);

    }

    decrypt(sKey:Uint8Array, cipher_text:string){

        // divide cipher text into blocks
        let blocks = this.str2block(cipher_text);
        let text_blocks = new Array<Uint8Array>();
        let temp_block, swap_block;

        let temp_keys = this.generate_subkeys(sKey);

        // decrypt n blocks from the end
        //for(let b = blocks.length; b >= 0; b--){
        for(let block of blocks){

            //init perm
            temp_block = this.map_to_table(block, this.init_premuitation);
            
            for(let i = 15; i >= 0; i--){
                temp_block = this.des_f(temp_block, temp_keys[i]);
            }

            //swap left and right
            swap_block = temp_block.slice(4,8);
            temp_block.set(temp_block.slice(0,4), 4);
            temp_block.set(swap_block); 
            
            //final perm
            temp_block = this.map_to_table(temp_block, this.final_premuitation);
        
            text_blocks.push(temp_block);
        }
        // turn cipher block into cipher text
        return this.block2str(text_blocks).trim();

    }

    str2block(str: string): Uint8Array[]{

        let block = new Uint8Array(8);
        let result = new Array<Uint8Array>();
        let byte;
        let blocks_needed = Math.floor(str.length / 8) + 1;

        for(let i = 1; i <= blocks_needed*8; i++){

            if(i >= str.length+1){
                block[(i-1) % 8] = 32; // fill it with spaces
                continue;
            }

            byte = str.charCodeAt(i-1);

            if(i % 8 === 0){
                block[(i-1) % 8] = byte;
                result.push(block);
                block = new Uint8Array(8);
            }else{
                block[(i-1) % 8] = byte;
            }
        }

        // add last block if not added
        // which is when str.length is not multiple of 8
        if(str.length % 8 !== 0)
            result.push(block);

        return result;
    }

    block2str(blocks: Uint8Array[]): string{

        let result = "";
        for(let block of blocks)
            block.forEach(x => result += String.fromCharCode(x));

        return result;
    }


    des_f(block: Uint8Array, temp_key:Uint8Array) : Uint8Array{

        //assume temp key is size 8
        //block size is 8, = 64bits
        let left_block = block.slice(0, 4);
        let right_block = block.slice(4, 8);
        let result = new Uint8Array(8);

        let expand = this.expand_32to48(right_block);
        let xor = this.x_or(expand, temp_key);
        let sbox = this.sbox(xor, this.sBoxs);
        let perm = this.map_to_table(sbox, this.permutation_32);
        let new_right_block = this.x_or(perm, left_block);

        //return (right + left)
        result.set(right_block);
        result.set(new_right_block, 4);

        return result;
    }

    expand_32to48(inp: Uint8Array): Uint8Array{

        //input size 4
        //this function uses the expansion table 6 x 8
        let result = new Uint8Array(8);
        let bit_index, inp_byte_index, byte_index;
        for(let i = 1; i <= 48; i++){

            byte_index = Math.floor((i-1) / 6);
            bit_index = this.expansion[Math.floor((i-1) / 6)][(i-1) % 6];
            inp_byte_index = Math.floor((bit_index-1) / 8);

            if(bit_index % 8 === 0){
                if(i % 6 === 0)
                    result[byte_index] |= this.get_bit(8, inp[inp_byte_index]);
                else
                    result[byte_index] |= this.get_bit(8, inp[inp_byte_index]) << 6 - (i % 6);
            }else{
                if(i % 6 === 0)
                    result[byte_index] |= this.get_bit(bit_index % 8, inp[inp_byte_index]);
                else
                    result[byte_index] |= this.get_bit(bit_index % 8, inp[inp_byte_index]) << 6 - (i % 6);

            }
        }
        return result;
    }

    x_or(inp: Uint8Array, inp2: Uint8Array): Uint8Array{

        //assume both input is the same size
        let result = new Uint8Array(inp.length);
        for(let i = 0; i < inp.length; i++)
            result[i] = inp[i] ^ inp2[i];

        return result
    }

    sbox(inp: Uint8Array, sboxs: number[][][]): Uint8Array{

        //input size 8, 8x6 = 48bits

        let outer_bits, inner_bits;
        let currVal = 0;
        let result = new Uint8Array(4);
        for(let i = 1; i <= 8; i++){

            outer_bits = 0;
            inner_bits = 0;

            outer_bits |= inp[i-1] & 1 ; // 0000 0001 masking
            outer_bits |= ((inp[i-1] & 32) >> 4); // 0010 0000 mask + shift to 2^1 bit

            inner_bits |= (inp[i-1] & 30) >> 1; // 0001 1110 mask + shift 1
            
            if(i % 2 == 1){
                currVal = sboxs[i-1][outer_bits][inner_bits] << 4;
            }
            // when we have 2 pairs of results (8bits), 
            // copy that to result as the first byte
            else{
                currVal |= sboxs[i-1][outer_bits][inner_bits];
                result[Math.floor((i-1)/2)] = currVal;
            }
        }
        return result
    }

    map_to_table(inp: Uint8Array, table: number[][]): Uint8Array{

        //this function assume that inp has the same size as table
        //i.e not compression or expansion 8 x n

        let result = new Uint8Array(inp.length);
        let row_length = table.length;
        let col_length = table[0].length
        let tbl_size = row_length * col_length;
        let bit_index, byte_index, inp_byte_index;

        for(let i = 1; i <= tbl_size; i++){

            byte_index = Math.floor((i-1)/8);
            bit_index = table[byte_index][(i-1) % 8];
            inp_byte_index = Math.floor((bit_index-1) / 8);
            if(bit_index % 8 === 0){
                if(i % 8 === 0)
                    result[byte_index] |= this.get_bit(8, inp[inp_byte_index]);
                else
                    result[byte_index] |= this.get_bit(8, inp[inp_byte_index]) << 8 - (i % 8);
            }else{
                if(i % 8 === 0)
                    result[byte_index] |= this.get_bit(bit_index % 8, inp[inp_byte_index]);
                else
                    result[byte_index] |= this.get_bit(bit_index % 8, inp[inp_byte_index]) << 8 - (i % 8);
                
            }           
        }
        return result

    }

    generate_subkeys(sKey: Uint8Array){ //:Array<Uint8Array>

        //input length is 8, 64bits
        //only take up to the 7th bit of every byte
        //return length 16 keys
        let subKeys = new Array<Uint8Array>();
        let p_sKey = this.permute_sKey(sKey);
        let next_carry, this_carry = 0;

        // 16 rounds
        for(let i = 1; i <= 16; i++){

            //left half
            for(let l_byte = 3; l_byte >= 0; l_byte--){
                 
                //skip adding carry when meeting the 4th byte the first time
                if(l_byte !== 3){

                    this_carry = next_carry;
                    next_carry = p_sKey[l_byte] & (-128 >> this.l_shifts[i] & 127); // 0110 0000 or 0100 0000 
                    p_sKey[l_byte] = (p_sKey[l_byte] << this.l_shifts[i]) & 127;
                    
                    //apply carry
                    p_sKey[l_byte] |= (this_carry >> (7 - this.l_shifts[i])); // bits to shift and mask
                    
                }
                else{
                    //Preserve 1 or 2 leftmost bit(s) and shift current byte
                    next_carry = p_sKey[l_byte] & (128 >> this.l_shifts[i] & 127); // 0110 0000 or 0100 0000 
                    p_sKey[l_byte] = (p_sKey[l_byte] << this.l_shifts[i]) & 127;
                }
            }

            //Add this next carry back to the 4th byte
            p_sKey[3] |= (next_carry >> (7 - this.l_shifts[i]));


            //right half
            for(let r_byte = 7; r_byte >= 4; r_byte--){
                
                //skip adding carry when meeting the 4th byte the first time
                if(r_byte !== 7){

                    this_carry = next_carry;
                    next_carry = p_sKey[r_byte] & (-128 >> this.l_shifts[i] & 127); // 0110 0000 or 0100 0000 
                    p_sKey[r_byte] = (p_sKey[r_byte] << this.l_shifts[i]) & 127;
                    
                    //apply carry
                    p_sKey[r_byte] |= (this_carry >> (7 - this.l_shifts[i])); // bits to shift and mask
                    
                }else{
                    //Preserve 1 or 2 leftmost bit(s) and shift current byte
                    next_carry = p_sKey[r_byte] & (128 >> this.l_shifts[i] & 127); // 0110 0000 or 0100 0000 
                    p_sKey[r_byte] = (p_sKey[r_byte] << this.l_shifts[i]) & 127;
                }
            }

            //Add this next carry back to the 8th byte
            p_sKey[7] |= (next_carry >> (7 - this.l_shifts[i]));

            //compress 56bit key to 48bit
            //subKeys.push(this.compress_56to48(p_sKey));
            subKeys.push(p_sKey.slice());
        }   

        return subKeys
    }

    compress_56to48(temp_key: Uint8Array): Uint8Array{

        let compressed_tKey = new Uint8Array(8);
        let byte_index, bit_index, inp_byte_index;
        let offset = 0;
        let offset_map = {};

        //compute offset
        for(let i = 1; i <= 56; i++){
            if((i + offset) % 8 === 1)
                offset += 1;
            offset_map[i] = offset;
        }

        //assume input has an Uint8Array with size 8
        //Take the left 7 bits from each byte
        for(let i = 1; i <= 48; i++){

            byte_index = Math.floor((i-1) / 6);
            bit_index = this.k_compress[byte_index][(i-1) % 6];
            bit_index = bit_index + offset_map[bit_index];
            inp_byte_index = Math.floor((bit_index-1) / 8);

            if(bit_index % 8 === 0){
                //console.log(i, bit_index, this.get_bit(8, temp_key[inp_byte_index]))
                if(i % 6 === 0)
                    compressed_tKey[byte_index] |= this.get_bit(8, temp_key[inp_byte_index]);
                else
                    compressed_tKey[byte_index] |= this.get_bit(8, temp_key[inp_byte_index]) << 6 - (i % 6);
            }else{
                //console.log(i, bit_index, this.get_bit(bit_index % 8, temp_key[inp_byte_index]))
                if(i % 6 === 0)
                    compressed_tKey[byte_index] |= this.get_bit(bit_index % 8, temp_key[inp_byte_index]);
                else
                    compressed_tKey[byte_index] |= this.get_bit(bit_index % 8, temp_key[inp_byte_index]) << 6 - (i % 6);
            }

        }

        return compressed_tKey
    }

    permute_sKey(sKey: Uint8Array){

        //use pc_1
        let premuted_sKey = new Uint8Array(8);
        let byte_index, bit_index, inp_byte_index;

        for(let i = 1; i <= 56; i++){
            
            byte_index = Math.floor((i-1) / 7);
            bit_index = this.pc_1[byte_index][(i-1) % 7];
            inp_byte_index = Math.floor((bit_index-1) / 8);

            if(bit_index % 8 === 0){
                if(i % 7 === 0)
                    premuted_sKey[byte_index] |= this.get_bit(8, sKey[inp_byte_index]);
                else
                    premuted_sKey[byte_index] |= this.get_bit(8, sKey[inp_byte_index]) << 7 - (i % 7);
            }else{
                if(i % 7 === 0)
                    premuted_sKey[byte_index] |= this.get_bit(bit_index % 8, sKey[inp_byte_index]);
                else
                    premuted_sKey[byte_index] |= this.get_bit(bit_index % 8, sKey[inp_byte_index]) << 7 - (i % 7);
            }
        }

        return premuted_sKey;
    }
    
    private get_bit(bit_pos:number, byte_value:number){
        //return the value in 8bit with the given
        //bit index, bit value
        let mask = 128 >> (bit_pos-1);
        return (byte_value & mask) >> (8 - bit_pos);
    }
    




}
