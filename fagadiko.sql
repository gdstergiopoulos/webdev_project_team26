PGDMP  !                    |           fagadiko    16.2    16.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    16398    fagadiko    DATABASE     |   CREATE DATABASE fagadiko WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Europe.1253';
    DROP DATABASE fagadiko;
                postgres    false            �            1259    16505    FOODITEM    TABLE     �   CREATE TABLE public."FOODITEM" (
    foodname character varying,
    description text,
    price integer,
    onmenu boolean,
    img text,
    "itemID" integer NOT NULL
);
    DROP TABLE public."FOODITEM";
       public         heap    postgres    false            �            1259    16514    FOODITEM_new_itemID_seq    SEQUENCE     �   CREATE SEQUENCE public."FOODITEM_new_itemID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."FOODITEM_new_itemID_seq";
       public          postgres    false    218                       0    0    FOODITEM_new_itemID_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."FOODITEM_new_itemID_seq" OWNED BY public."FOODITEM"."itemID";
          public          postgres    false    219            �            1259    16526 	   HASTABLES    TABLE     ]   CREATE TABLE public."HASTABLES" (
    "reservID" integer,
    "tableID" character varying
);
    DROP TABLE public."HASTABLES";
       public         heap    postgres    false            �            1259    16524    RESERVATION_reservID_seq    SEQUENCE     �   CREATE SEQUENCE public."RESERVATION_reservID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."RESERVATION_reservID_seq";
       public          postgres    false            �            1259    16488    RESERVATION    TABLE     �  CREATE TABLE public."RESERVATION" (
    "reservID" integer DEFAULT nextval('public."RESERVATION_reservID_seq"'::regclass) NOT NULL,
    desired_area character varying,
    numofpeople integer,
    date date,
    "time" time without time zone,
    datetimemade timestamp without time zone,
    "tableID" character varying,
    username character varying,
    comments text,
    status character varying
);
 !   DROP TABLE public."RESERVATION";
       public         heap    postgres    false    220            �            1259    16462    TABLE    TABLE     |   CREATE TABLE public."TABLE" (
    "tableID" character varying NOT NULL,
    area character varying,
    capacity integer
);
    DROP TABLE public."TABLE";
       public         heap    postgres    false            �            1259    16455    USER    TABLE     �   CREATE TABLE public."USER" (
    username character varying NOT NULL,
    password character varying,
    "Fname" character varying,
    "Lname" character varying,
    mail character varying,
    phone character varying,
    role character varying
);
    DROP TABLE public."USER";
       public         heap    postgres    false            b           2604    16515    FOODITEM itemID    DEFAULT     |   ALTER TABLE ONLY public."FOODITEM" ALTER COLUMN "itemID" SET DEFAULT nextval('public."FOODITEM_new_itemID_seq"'::regclass);
 B   ALTER TABLE public."FOODITEM" ALTER COLUMN "itemID" DROP DEFAULT;
       public          postgres    false    219    218                      0    16505    FOODITEM 
   TABLE DATA           Y   COPY public."FOODITEM" (foodname, description, price, onmenu, img, "itemID") FROM stdin;
    public          postgres    false    218   �!                 0    16526 	   HASTABLES 
   TABLE DATA           <   COPY public."HASTABLES" ("reservID", "tableID") FROM stdin;
    public          postgres    false    221   �'                  0    16488    RESERVATION 
   TABLE DATA           �   COPY public."RESERVATION" ("reservID", desired_area, numofpeople, date, "time", datetimemade, "tableID", username, comments, status) FROM stdin;
    public          postgres    false    217   �'       �          0    16462    TABLE 
   TABLE DATA           <   COPY public."TABLE" ("tableID", area, capacity) FROM stdin;
    public          postgres    false    216   �(       �          0    16455    USER 
   TABLE DATA           Y   COPY public."USER" (username, password, "Fname", "Lname", mail, phone, role) FROM stdin;
    public          postgres    false    215   �(                  0    0    FOODITEM_new_itemID_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."FOODITEM_new_itemID_seq"', 17, true);
          public          postgres    false    219                       0    0    RESERVATION_reservID_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."RESERVATION_reservID_seq"', 3, true);
          public          postgres    false    220            j           2606    16523    FOODITEM FOODITEM_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."FOODITEM"
    ADD CONSTRAINT "FOODITEM_pkey" PRIMARY KEY ("itemID");
 D   ALTER TABLE ONLY public."FOODITEM" DROP CONSTRAINT "FOODITEM_pkey";
       public            postgres    false    218            h           2606    16494    RESERVATION RESERVATION_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public."RESERVATION"
    ADD CONSTRAINT "RESERVATION_pkey" PRIMARY KEY ("reservID");
 J   ALTER TABLE ONLY public."RESERVATION" DROP CONSTRAINT "RESERVATION_pkey";
       public            postgres    false    217            f           2606    16468    TABLE TABLE_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public."TABLE"
    ADD CONSTRAINT "TABLE_pkey" PRIMARY KEY ("tableID");
 >   ALTER TABLE ONLY public."TABLE" DROP CONSTRAINT "TABLE_pkey";
       public            postgres    false    216            d           2606    16461    USER USER_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."USER"
    ADD CONSTRAINT "USER_pkey" PRIMARY KEY (username);
 <   ALTER TABLE ONLY public."USER" DROP CONSTRAINT "USER_pkey";
       public            postgres    false    215            m           2606    16541 !   HASTABLES HASTABLES_reservID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."HASTABLES"
    ADD CONSTRAINT "HASTABLES_reservID_fkey" FOREIGN KEY ("reservID") REFERENCES public."RESERVATION"("reservID") ON UPDATE RESTRICT ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public."HASTABLES" DROP CONSTRAINT "HASTABLES_reservID_fkey";
       public          postgres    false    221    4712    217            n           2606    16546     HASTABLES HASTABLES_tableID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."HASTABLES"
    ADD CONSTRAINT "HASTABLES_tableID_fkey" FOREIGN KEY ("tableID") REFERENCES public."TABLE"("tableID") ON UPDATE RESTRICT ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public."HASTABLES" DROP CONSTRAINT "HASTABLES_tableID_fkey";
       public          postgres    false    4710    216    221            k           2606    16500 $   RESERVATION RESERVATION_tableID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."RESERVATION"
    ADD CONSTRAINT "RESERVATION_tableID_fkey" FOREIGN KEY ("tableID") REFERENCES public."TABLE"("tableID") ON UPDATE RESTRICT ON DELETE RESTRICT;
 R   ALTER TABLE ONLY public."RESERVATION" DROP CONSTRAINT "RESERVATION_tableID_fkey";
       public          postgres    false    4710    216    217            l           2606    16495 %   RESERVATION RESERVATION_username_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."RESERVATION"
    ADD CONSTRAINT "RESERVATION_username_fkey" FOREIGN KEY (username) REFERENCES public."USER"(username) ON UPDATE RESTRICT ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public."RESERVATION" DROP CONSTRAINT "RESERVATION_username_fkey";
       public          postgres    false    217    4708    215               �  x�uV˒�6<K_�P䬓8���8.��U[YWr�eIX ��C2����ZI�\v%�5���3�s�9��<y�ɵ����S>��ju�H�l��0��b�0֬�@I��#%���J[��h�,$�����Rܫ?�ѳz��U�ܩ�R�wj�бNvV}0�r�ȵ8=M�x2iP#ۄ�z`�H�Y5��۩.p�唲�b0b�#%�qW������XEց��T�����ړ��-�J'f����\�K0KH��Շ#��$��)��4x7+ߩ��ч��rB"����f�1�����7o7i�j�����j�k?�~�z���`ԃ66Ɔ�Ayw��W$�x^����a-[��V��I$�5"�$�X�om,XE�������gF�ɚ�g�n��9�R�kC6���N1�A-2)8��$�)
i���O���!���p] 	�\9d�!�p���<(�g`�
V�TS��hl��+�+�3Bp��@���h"�*;d�C6�XV�qP�Ah�tw�Sy�����~0� ��Gd��<���D��+J�B���S�@ܲ���"���P��4M�8)�{Q= 	��z1�e����o5��a���� �����U����O�x����a�^	t�`�!�
#��Z�{�E�����s-e��%`xY�I�&%� "،�,�˂�������@�%��F������
ix��@f��&�D�l;Q��p4M �~�R��!�UL��������$�@��-�2Ac{��L���nZ��v8o�/�)������ �.��8� ��J�*LXY~��hOR��XSa.�H��]��r���N0UxN\�S�&v��,��$H1�;|D�?�Cv��n虨�`��x��Xy����"|ĬQ�����c����H�J��xQ�pq*,Y�B�bW��%��!��M3�M� ����f���+m�	T�ZA �J�H<�;ۢ�`��"�Ì��Z*�IPU=4�28W0k
B�i�
�i�p���� %>�'���Nh8# on�X�.l��}���[&�*�1�-%h�4���K���ɽzgAD����.�B�âC ��/�=��s��� `��KY�	�g|m,�(����r��΀i?�Z�� ��4��\�@��O�r�r���n�n�����3��"&M��fP�J!�H\���$�MK>����
���z�tje��e�P*E�ǥ���3�p��k�Q���ۀ�z-l7�0�2�Yi��X�ӌ;�8�kƵ_�`O%�']Ǽ)#�2��}{WJ�Xl��F�N+\�hMi�?ޚ�<W�{R ��9�x��^$5����S�������6~8g،��GW���Q�"�` �Yjz���%z9<UHɥ݅R�gUћ]k���;䮃�%:����0��v�"~��!�k���X1rwnE�ғ9����_��� �!�����)������y}3��ra�����v��m            x������ � �          �   x�u�Kn� EǏUx��l�"��L��T�֖���p��Q3ap�s�}\~�{H�#�M��:b�x�H�9��
��rHy���wPV����>}\��4�<�c��m����E�dƃK?p�RfTWaC*�GCח��/ɓ�������w�)���Ǿ�q9������el;:9lh�_�h1�y��R.����)�ۺ4�<(�~�	p�      �      x�3���+�LI�M���4����� A"K      �   �   x�K/.I-�442615�tO�/JO�
�g����s��T8�%�'�df��%��B��[Xp&��f�q���p��s���<�w����s��7q�[|���V0w����@��s��R�)���8��&f怍7�46445214�,-N-����� �}E^     