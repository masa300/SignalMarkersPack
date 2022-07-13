var renderClass = "jp.ngt.rtm.render.SignalPartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.rtm.modelpack.state);	// ResourceState
importPackage(Packages.net.minecraft.util);//ResourceLocation

importPackage(Packages.jp.kaiz.minfo.api);

var fontRenderer = null;

function init(par1, par2) {
	obj = renderer.registerParts(new Parts("sign", "fixture"));
    getFontRenderer();
}

function render(entity, pass, par3) {
	GL11.glPushMatrix();
	if (entity != null) {
        yaw = entity.getRotation() - entity.getBlockDirection();
		GL11.glRotatef(yaw, 0.0, 1.0, 0.0);
    }

	obj.render(renderer);
	renderFont(entity, pass, par3);
	GL11.glPopMatrix();
}

function getFontRenderer() {
	//フォント名指定の場合 TTFファイル指定の場合はResourceLocationを第一引数へ

	return fontRenderer == null ? fontRenderer = new MinFoCustomFontRenderer(new ResourceLocation("fonts/ipagp.ttf"), 32) : fontRenderer;
}

var CELL_WIDTH_SCALE = 0.30 - 0.01;	// 文字が中央より若干ズレるので微調整
var CELL_HEIGHT_SCALE = 0.009;
var CHAR_OFFSET = {
	'X': -0.15,
	'Y': 0.95,
	'Z': 0.251
};

///renderの一番最後に突っ込む
function renderFont(entity, pass, par3) {
	if(entity == null) return;
	var customName = entity.getResourceState().getName();
	customName = customName.matches("[0-9]{1,2}|.{1}") ? customName : "?";

	GL11.glPushMatrix();
    var charWidth = getFontRenderer().getTextWidth(customName);
	charWidth = customName === "1" ? 20 : charWidth;	// "1"だけ文字が潰れる対策
    createChar(customName, CHAR_OFFSET.X, CHAR_OFFSET.Y, CHAR_OFFSET.Z, CELL_WIDTH_SCALE / charWidth, CELL_HEIGHT_SCALE, charWidth);
	GL11.glPopMatrix();
}

function createChar(char, x, y, z, wScale, hScale, charWidth) {
	GL11.glPushMatrix();
	GL11.glTranslatef(x, y, z);
	GL11.glScalef(wScale, hScale, 1.0);
    getFontRenderer().drawText(char, 0xFFFFFF);
    GL11.glPopMatrix();
}