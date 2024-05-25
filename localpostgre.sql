PGDMP  .    '                |           fagadiko    16.2    16.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398    fagadiko    DATABASE     |   CREATE DATABASE fagadiko WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Europe.1253';
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
       public          postgres    false    218                       0    0    FOODITEM_new_itemID_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."FOODITEM_new_itemID_seq" OWNED BY public."FOODITEM"."itemID";
          public          postgres    false    219            �            1259    16526 	   HASTABLES    TABLE     o   CREATE TABLE public."HASTABLES" (
    "reservID" integer NOT NULL,
    "tableID" character varying NOT NULL
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
       public          postgres    false            �            1259    16488    RESERVATION    TABLE     g  CREATE TABLE public."RESERVATION" (
    "reservID" integer DEFAULT nextval('public."RESERVATION_reservID_seq"'::regclass) NOT NULL,
    desired_area character varying,
    numofpeople integer,
    date date,
    "time" time without time zone,
    datetimemade timestamp without time zone,
    username character varying,
    comments text,
    status text
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
       public          postgres    false    219    218                      0    16505    FOODITEM 
   TABLE DATA           Y   COPY public."FOODITEM" (foodname, description, price, onmenu, img, "itemID") FROM stdin;
    public          postgres    false    218   (!                 0    16526 	   HASTABLES 
   TABLE DATA           <   COPY public."HASTABLES" ("reservID", "tableID") FROM stdin;
    public          postgres    false    221   '                 0    16488    RESERVATION 
   TABLE DATA           �   COPY public."RESERVATION" ("reservID", desired_area, numofpeople, date, "time", datetimemade, username, comments, status) FROM stdin;
    public          postgres    false    217   A'                  0    16462    TABLE 
   TABLE DATA           <   COPY public."TABLE" ("tableID", area, capacity) FROM stdin;
    public          postgres    false    216   �(       �          0    16455    USER 
   TABLE DATA           Y   COPY public."USER" (username, password, "Fname", "Lname", mail, phone, role) FROM stdin;
    public          postgres    false    215   �)                  0    0    FOODITEM_new_itemID_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."FOODITEM_new_itemID_seq"', 17, true);
          public          postgres    false    219                       0    0    RESERVATION_reservID_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."RESERVATION_reservID_seq"', 8, true);
          public          postgres    false    220            j           2606    16523    FOODITEM FOODITEM_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."FOODITEM"
    ADD CONSTRAINT "FOODITEM_pkey" PRIMARY KEY ("itemID");
 D   ALTER TABLE ONLY public."FOODITEM" DROP CONSTRAINT "FOODITEM_pkey";
       public            postgres    false    218            l           2606    16611    HASTABLES HASTABLES_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public."HASTABLES"
    ADD CONSTRAINT "HASTABLES_pkey" PRIMARY KEY ("reservID", "tableID");
 F   ALTER TABLE ONLY public."HASTABLES" DROP CONSTRAINT "HASTABLES_pkey";
       public            postgres    false    221    221            h           2606    16494    RESERVATION RESERVATION_pkey 
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
       public            postgres    false    215            n           2606    16541 !   HASTABLES HASTABLES_reservID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."HASTABLES"
    ADD CONSTRAINT "HASTABLES_reservID_fkey" FOREIGN KEY ("reservID") REFERENCES public."RESERVATION"("reservID") ON UPDATE RESTRICT ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public."HASTABLES" DROP CONSTRAINT "HASTABLES_reservID_fkey";
       public          postgres    false    4712    221    217            o           2606    16546     HASTABLES HASTABLES_tableID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."HASTABLES"
    ADD CONSTRAINT "HASTABLES_tableID_fkey" FOREIGN KEY ("tableID") REFERENCES public."TABLE"("tableID") ON UPDATE RESTRICT ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public."HASTABLES" DROP CONSTRAINT "HASTABLES_tableID_fkey";
       public          postgres    false    4710    216    221            m           2606    16495 %   RESERVATION RESERVATION_username_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."RESERVATION"
    ADD CONSTRAINT "RESERVATION_username_fkey" FOREIGN KEY (username) REFERENCES public."USER"(username) ON UPDATE RESTRICT ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public."RESERVATION" DROP CONSTRAINT "RESERVATION_username_fkey";
       public          postgres    false    215    217    4708               �  x�uV˒�6<K_1��Y'q6Gg㸜*Wme]�%��@����_��!��d�� �Ӄ��r1�gz45}��|Jl
MqL�}C%R阎�J&j�9Ɣ)6�/��7�wd�7咘� ƚ�79;K6-.�tr��&q��L&ԔgyOOť�並���sF9�.��偎��y��͸��M�>)��dS���aـ7�C��FS���ZLh'��MrR���O��T��~�L�cpq̄������(����,�L;jG#L1N���Q����:�7ww��y�s�~���`���Ch7o����<��7B=���j�#�֎��E���_�I���;�@l��&&�lT%����]�m��e݉ٷ����3�2�T-oj�I��ڥ�0pj�'�`�ѫ	�d��	'�X� _U��G�� ��t\�d.DW��e���E+�g���S��n�D=�on�q��n��#G�ޔ�i�L:P `�������\��w�F��ۮH	臘J/�~�
���d�6���_����މ6�?������Sp�B�GS��l���;bc;�4%�DC&���x�&�2b�ơ3�k(A�s!=��N���.T�韎�*�0؎UA�`�lI�F;��"�0S��b�2�	4 BcϩR� )?(������IR�~�>�E%Ł�T��dn;�"���Z8^�g����[���4�o͚Aj|�S7��_�:�-h~D\p�1g�ռ��	  ؜�~��E\���{@�@��*�߱�f��m����Hjef�vk���Ɨ�qJּi6a�~s�}t�φ>����=o��ݙh媤�	$��A�L��F����~`P�g
$�xʥ�� D�W�ܭ��&�ޜ���3�΢
n��������--�`j�jE/��G��~��&$"ƻ~��J��H,{��+2x��0�$�=�ӞFl�K��QK0�N��S���2_�S��A�~J1_ዑ!�=��~G��
/�}��Eb�@���GDm�	�t2�4z纴	0r�)�aIF��ũs���7���	���.��*�_������OW��C#���_FgW��2o�y��ʳ)����)���m�#HE��rX��73A�����u^�DK+$�:?m:g��`��I櫩7Orʜ����(��^�*��Y���Z�j�!:XkO���H�-L]]�VE�r��.9�6��v�U�L��jK=5ꕰ�Ix8�$��w��^}|eK0e�2�&N�GKH�=}8&�3cP�f�>����7�ݴ������-�nY�)FNϗ�.D_��]��^z'�OY��sW_�JetW��2����:�mh���ܠuJ��!{��ֆ�EU����X� �Q^|������Tv-nY�����r��	�GT\pՋl�x�\�+��T~��S��T�<�C�t)��r�9Iu��r���Z�7�|�6��������m            x�3�,IL�I56�2��L��b���� XS         e  x�u�Mn�0F��)|� ��ߠ���颋l�-j�J�}m'm�J$�b��<��X؟�w?�
'��jEP:��ךb����H�ɏ@UO���$�_��6�X��Q$q!"ƋXC�kTQh2+��p��=��XS:���<d�^���h�>3�9�B��Ŕ��R_�Hsɡ�C�jl�s��D!�J�Ё�$M5�����lI!�
ơ�CߥE���}�$J��Z����®xn�����#�X�da�4Fx'? ��^���L�4�8
�h�BC�)���B�{�<����m��5{ܔჺ�j8����w��i��|��Ɓ�x���6y<�����wy�e?o��8          �   x�m��n�0���0�c���.�a�4�HX������9�_��4��r�T2�Χ�S��𴽚̓Ơ	h�Z-�FEt	�S�B�B�:��=�̱\˵��%�Ҿ��EޅF�R^)VJ�
JE��RyTގʓ��m�͸�ڴ��m���� "\Hp!��h�	-�����겞�]s/MJ/M��RI�<*���8��o�}�u���{jN��`�0j�4����a����y       �   �   x�}O;�0���TM�[�X�XY,�
�TI���p��7H�D�(l?޳�j��Q���	�̺/E#�Z(��D�D�E��BT��Q���EU֤e�������n��<��������=�MW<��k�Bur^a�v�IR�A+&	6X���1L{�-��P?�,�q��[�����@��̥������=U48f�B^�^q�     